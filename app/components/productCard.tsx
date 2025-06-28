"use client";

import { Heart, Trash } from "lucide-react";
import { dataProductType } from "@/app/(data)/getProducts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { delProduct } from "../(data)/delProduct";
import { useRouter } from "next/navigation";
import { Currency } from "./currency";
import { useUser } from "./auth-context";
import { useCart } from "./cartContext";
import Link from "next/link";
import Image from "next/image";

type propsType = {
  updateProducts: () => Promise<void>;
  product: dataProductType;
};

export default function ProductCard(props: propsType) {
  const { user, customData } = useUser();
  const { addToCart, removeFromCart, cart, setIsCartOpen } = useCart();
  let [wishlisted, setWishlisted] = useState(
    cart.filter(p => p.product.id == props.product.id).length > 0
  );

  useEffect(() => {
    setWishlisted(() => {
      return cart.filter(p => p.product.id == props.product.id).length > 0
    })
  }, [cart])

  return (
    <div key={`${props.product.title}`} className="w-full aspect-3/5 mb-5">
      <Link href={`/products/${props.product.id}`}>
        <div className="basis-full shrink-0 aspect-2/3 relative">
          <div className="absolute top-3 left-0 z-10 bg-gray-100 text-xs px-2 py-1 rounded-r-full">
            {props.product.dispatch === "Ready to be shipped!"
              ? "Ready to Ship"
              : "Preorder"}
          </div>
          <Image
            src={props.product.media[0] as string}
            alt={props.product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          ></Image>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (wishlisted) {
                removeFromCart(props.product.id);
              } else {
                addToCart(props.product, props.product.sizes[0], 1);
                setIsCartOpen(true);
              }
            }}
            className="absolute top-3 right-3 rounded-full bg-white w-7 h-7 flex items-center justify-center"
          >
            <Heart
              fill={wishlisted ? "black" : "white"}
              className="w-4"
            ></Heart>
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
            <p className="text-sm text-slate-600">{props.product.title}</p>
            <Currency price={props.product.price}></Currency>
          </div>
        </div>
      </Link>
      {user && customData.admin == true && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="mr-2">
              <Trash></Trash>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex w-full flex-row justify-between">
              <DialogClose asChild className="w-2/5">
                <Button className="w-2/5" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="w-2/5"
                onClick={async () => {
                  await delProduct(props.product.id);
                  await props.updateProducts();
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
