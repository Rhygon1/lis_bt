import currency from "currency.js";
import { Heart, Trash } from "lucide-react";
import { dataProductType } from "@/app/data/getProducts";
import { useState } from "react";
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
import { delProduct } from "../data/delProduct";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { Currency } from "./currency";

type propsType = {
  updateProducts: () => void;
  product: dataProductType;
};

export default function ProductCard(props: propsType) {
  const { user } = useUser();
  let [wishlisted, setWishlisted] = useState(false);
  const router = useRouter();

  return (
    <div key={`${props.product.title}`} className="w-full aspect-3/5 mb-5">
      <div className="basis-full shrink-0 aspect-2/3 relative">
        <img
          src={props.product.media[0] as string}
          className="w-full h-full object-top object-cover"
        ></img>
        <button
          onClick={() => setWishlisted((a) => !a)}
          className="absolute top-3 right-3 rounded-full bg-white w-7 h-7 flex items-center justify-center"
        >
          <Heart fill={wishlisted ? "black" : "white"} className="w-4"></Heart>
        </button>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <p className="text-sm text-slate-600">{props.product.title}</p>
          <Currency price={props.product.price}></Currency>
        </div>
        <SignedIn>
          {user?.publicMetadata.admin == true && (
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
                      await delProduct(props.product.id, user.id);
                      props.updateProducts()
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SignedIn>
      </div>
    </div>
  );
}
