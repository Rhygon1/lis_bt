'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cartContext";
import { useUser } from "./auth-context";
import CartItem from "./cartItem";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { user } = useUser();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger>
        <Heart className="flex justify-start"></Heart>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Wishlist</SheetTitle>
        </SheetHeader>
        {!user && (
          <p className="text-sm bg-yellow-100 text-gray-700 p-3 mx-4 rounded-md mb-4">Your cart changes will not be saved unless you log in.</p>
        )}
        <div className="flex-1 overflow-y-auto px-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}${item.size}`} className="mb-4">
                <CartItem product={item.product} size={item.size} quantity={item.quantity} />
                <Separator className="my-4" />
              </div>
            ))
          )}
        </div>
        <div className="mt-auto p-6 border-t">
          <Button className="w-full p-4">Send query</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
