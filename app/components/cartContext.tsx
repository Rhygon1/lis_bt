"use client";
import { dataProductType as Product } from "@/app/(data)/getProducts";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "./auth-context";
import getProductById from "@/app/(data)/getProductById";
import { createClient } from "@/utils/supabase/client";

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, size: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = "local_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { customData, user, isCustomDataLoading } = useUser();
  const supabase = createClient();

  // Helper to get cart from local storage
  const getLocalCart = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  }, []);

  // Helper to save cart to local storage
  const saveLocalCart = useCallback((currentCart: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(currentCart.map(item => ({
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity,
      }))));
    }
  }, []);

  // Function to save the current cart to the database
  const saveCartToDatabase = useCallback(async (currentCart: CartItem[]) => {
    if (user) {
      const cartData = currentCart.map(item => ({
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity,
      }));
      const { error } = await supabase
        .from("profiles")
        .update({ cart: cartData })
        .eq("id", user.id);

      if (error) {
        console.error("Error saving cart to database:", error);
      }
    }
  }, [user, supabase]);

  // Effect to load and merge cart on user change
  useEffect(() => {
    const loadAndMergeCart = async () => {
      if (user) {
        // User logged in: Merge local cart with DB cart
        // Only proceed if customData has finished loading
        if (isCustomDataLoading) {
          return; // Wait for customData to be populated by auth-context
        }

        const dbCartRaw = customData.cart || []; // This is the cart from the DB, now guaranteed to be fresh
        const localCartRaw = getLocalCart();

        let mergedCartItems: CartItem[] = [];

        // Collect all unique product IDs from both DB and local carts
        const allProductIds = new Set<string>();
        dbCartRaw.forEach((item: any) => {
          if (item && typeof item === 'object' && 'productId' in item) {
            allProductIds.add(item.productId as string);
          }
        });
        localCartRaw.forEach((item: any) => {
          if (item && typeof item === 'object' && 'productId' in item) {
            allProductIds.add(item.productId as string);
          }
        });

        let products: Product[] = [];
        if (allProductIds.size > 0) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .in("id", Array.from(allProductIds));

          if (error) {
            console.error("Error fetching products for cart:", error);
          } else if (data) {
            products = data.map((product) => ({
              title: product.title,
              description: product.description,
              media: product.media,
              price: product.price,
              customPrice: product.custom_price,
              unstitchPrice: product.unstitch_price,
              dispatch: product.dispatch,
              sizes: product.sizes,
              inStock: product.in_stock,
              type: product.type,
              id: product.id,
              createdAt: product.created_at as string,
            }));
          }
        }

        const productMap = new Map<string, Product>();
        products.forEach(p => productMap.set(p.id, p));

        const resolveCartItems = (rawCart: any[]) => {
          const resolvedItems: CartItem[] = [];
          rawCart.forEach((item: any) => {
            if (item && typeof item === 'object' && 'productId' in item && 'size' in item && 'quantity' in item) {
              const product = productMap.get(item.productId as string);
              if (product) {
                resolvedItems.push({
                  product: product,
                  size: item.size as string,
                  quantity: item.quantity as number,
                });
              }
            }
          });
          return resolvedItems;
        };

        const dbCartResolved = resolveCartItems(dbCartRaw);
        const localCartResolved = resolveCartItems(localCartRaw);

        // Start with DB cart items
        mergedCartItems = [...dbCartResolved];

        // Merge local cart items, prioritizing local quantities for existing items
        for (const localItem of localCartResolved) {
          const existingIndex = mergedCartItems.findIndex(
            (dbItem) => dbItem.product.id === localItem.product.id && dbItem.size === localItem.size
          );

          if (existingIndex !== -1) {
            mergedCartItems[existingIndex].quantity = localItem.quantity; // Add quantities
          } else {
            mergedCartItems.push(localItem);
          }
        }

        setCart(mergedCartItems);
        saveCartToDatabase(mergedCartItems); // Save the merged cart to DB
        localStorage.removeItem(LOCAL_STORAGE_CART_KEY); // Clear local storage after merge

      } else {
        // User logged out or not logged in: Load cart from local storage
        const initialLocalCart = getLocalCart();
        const loadedLocalCartItems: CartItem[] = [];

        for (const item of initialLocalCart) {
          if (item && typeof item === 'object' && 'productId' in item && 'size' in item && 'quantity' in item) {
            const product = await getProductById(item.productId as string);
            if (product) {
              loadedLocalCartItems.push({
                product: product,
                size: item.size as string,
                quantity: item.quantity as number,
              });
            }
          }
        }
        setCart(loadedLocalCartItems);
      }
    };

    loadAndMergeCart();
  }, [user, customData.cart, getLocalCart, saveCartToDatabase]); // Depend on user and customData.cart

  // Effect to save cart to database or local storage whenever it changes
  useEffect(() => {
    if (user) {
      saveCartToDatabase(cart);
    } else {
      saveLocalCart(cart);
    }
  }, [cart, user, saveCartToDatabase, saveLocalCart]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, size, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartItem = (productId: string, size: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, size, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};