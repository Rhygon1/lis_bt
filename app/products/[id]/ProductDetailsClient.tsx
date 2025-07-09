"use client";

import { ProductImageSlider } from "@/app/components/productImageSlider";
import { dataProductType } from "@/app/(data)/getProducts";
import { Button } from "@/components/ui/button";
import { Currency } from "@/app/components/currency";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/components/auth-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCart } from "@/app/components/cartContext";
import { updateProduct } from "@/app/(data)/updateProduct";
import { ShareButton } from "@/components/share-button";

interface ProductDetailsClientProps {
  product: dataProductType;
}

export default function ProductDetailsClient({ product: initialProduct }: ProductDetailsClientProps) {
  const [product, setProduct] = useState<dataProductType>(initialProduct);
  const [price, setPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [inStockStatus, setInStockStatus] = useState<boolean | null>(null);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const MOBILE_BREAKPOINT = 768;
  const { user, customData } = useUser();
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (product) {
      setInStockStatus(product.inStock);
    }
  }, [product]);

  const formSchema = z.object({
    productId: z.string(),
    size: z.string().min(1, "Please select a size"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: product.id,
      size: "",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (product) {
      const initialSize = product.sizes[0];
      setSelectedSize(initialSize);
      form.setValue("size", initialSize);
      if (initialSize.toLowerCase() === "unstitched") {
        setPrice(product.unstitchPrice);
      } else if (initialSize.toLowerCase() === "customized") {
        setPrice(product.customPrice);
      } else {
        setPrice(product.price);
      }
    }
  }, [product]);

  const handleSizeChange = (size: string) => {
    if (!size) return;
    setSelectedSize(size);
    form.setValue("size", size);
    if (product) {
      if (size.toLowerCase() === "unstitched") {
        setPrice(product.unstitchPrice);
      } else if (size.toLowerCase() === "customized") {
        setPrice(product.customPrice);
      } else {
        setPrice(product.price);
      }
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (product) {
      addToCart(product, values.size, values.quantity);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <ProductImageSlider slides={product.media} />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">{product.title}</h1>
          <div className="flex items-center mb-4 lg:mb-6">
            <Currency price={price}></Currency>
            {inStockStatus ? (
              <span className="text-green-500 ml-4">In Stock</span>
            ) : (
              <span className="text-red-500 ml-4">Out of Stock</span>
            )}
            {user && customData?.admin && inStockStatus !== null && (
              <div className="flex items-center space-x-2 ml-4">
                <Switch
                  id="inStock-switch"
                  checked={inStockStatus}
                  onCheckedChange={async (checked) => {
                    const originalInStockStatus = inStockStatus; // Capture current state
                    setInStockStatus(checked); // Optimistic update

                    const result = await updateProduct({
                      id: product.id,
                      inStock: checked,
                    });

                    if (result.success) {
                      setUpdateMessage({ type: 'success', message: 'Product stock updated successfully!' });
                    } else {
                      setInStockStatus(originalInStockStatus); // Revert on error
                      setUpdateMessage({ type: 'error', message: `Failed to update stock: ${result.error}` });
                    }
                    setTimeout(() => setUpdateMessage(null), 3000);
                  }}
                />
                <Label htmlFor="inStock-switch">Toggle Stock</Label>
              </div>
            )}
						<ShareButton  description={`${product.title} by LIS Boutique!`} url={`https://www.lisboutique.in/products/${product.id}`} title={product.title}/>
          </div>
          <p className="text-sm text-blue-500 -mt-2 mb-4">Shipping will be calculated at final order time.</p>
          {updateMessage && (
            <div className={`text-sm ${updateMessage.type === 'success' ? 'text-green-500' : 'text-red-500'} mb-4`}>
              {updateMessage.message}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        defaultValue={selectedSize}
                        onValueChange={(value) => {
                          handleSizeChange(value);
                          field.onChange(value);
                        }}
                        className="flex flex-wrap gap-2 justify-start lg:gap-3"
                      >
                        {[
                          "Unstitched",
                          "Customized",
                          "XS",
                          "S",
                          "M",
                          "L",
                          "XL",
                          "XXL",
                          "3XL",
                          "4XL",
                          "5XL",
                          "6XL",
                          "7XL",
                          "8XL",
                          "0-6 months",
                          "6-12 months",
                          "1-2 years",
                          "2-3 years",
                          "3-4 years",
                          "4-5 years",
                          "5-6 years",
                          "6-7 years",
                          "7-8 years",
                          "8-9 years",
                          "9-10 years",
                          "10-11 years",
                          "11-12 years",
                          "12-13 years",
                          "13-14 years",
                          "14-15 years", "One Size"
                        ].filter(size => product.sizes.includes(size)).map((size) => (
                          <ToggleGroupItem
                            key={size}
                            value={size}
                            className="py-2 min-w-fit px-2 text-lg rounded-xl border data-[state=on]:bg-slate-800 data-[state=on]:text-white"
                          >
                            <p>{size}</p>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-4 lg:mb-6">
                <h3 className="text-lg font-bold mb-2">Dispatch</h3>
                <p>{product.dispatch}</p>
              </div>
              {isMobile ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping Details</AccordionTrigger>
                    <AccordionContent>
                      <p>Dispatch Time: {product.dispatch}</p>
                      <p>Estimated delivery time will vary based on your location.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-2">Description</h3>
                  <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Shipping Details</AccordionTrigger>
                      <AccordionContent>
                        <p>Dispatch Time: {product.dispatch}</p>
                        <p>Estimated delivery time will vary based on your location.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="default" className="w-1/2 lg:w-auto">Add to Wishlist</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
