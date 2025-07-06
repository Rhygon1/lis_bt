"use client";
import { dataProductType as Product } from "@/app/(data)/getProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCart } from "./cartContext";
import { useEffect, useState } from "react";
import { Currency } from "./currency";

type CartItemProps = {
  product: Product;
  size: string;
  quantity: number;
};

export default function CartItem({ product, size, quantity }: CartItemProps) {
  const { removeFromCart, updateCartItem } = useCart();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (size.toLowerCase() === "unstitched") {
      setPrice(product.unstitchPrice);
    } else if (size.toLowerCase() === "customized") {
      setPrice(product.customPrice);
    } else {
      setPrice(product.price);
    }
  }, [size]);

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="w-24 h-24 relative rounded-md overflow-hidden">
        <img
          src={product.media[0] as string}
          alt={product.title}
          className="object-cover object-top w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <p className="text-sm font-medium">{product.title}</p>
        <Currency price={price}></Currency>
        <div className="flex items-center gap-2">
          <Select
            value={size}
            onValueChange={(newSize) =>
              updateCartItem(product.id, size, newSize, quantity)
            }
          >
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
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
                "14-15 years", "One Size",
              ]
                .filter((size) => product.sizes.includes(size))
                .map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {s}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              updateCartItem(product.id, size, size, parseInt(e.target.value))
            }
            className="w-16 h-8 text-xs"
          />
        </div>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => removeFromCart(product.id, size)}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
