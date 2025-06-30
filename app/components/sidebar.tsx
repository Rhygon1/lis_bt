"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CountrySelector from "./currencySelector";
import { useUser } from "./auth-context";

type propsType = {
  collections: string[];
};

export default function AppSidebar(props: propsType) {
  const { user, customData } = useUser();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="flex justify-start"></Menu>
      </SheetTrigger>
      <SheetContent side="left">
        {user && customData.admin == true ? (
          <Link href="/admin" className="ml-4 mt-5">
            <Button>Make product</Button>
          </Link>
        ) : (
          <div className="mt-5"></div>
        )}
        <CountrySelector></CountrySelector>

        <div className="ml-5 mt-2">
          <SheetClose asChild>
            <Link href="/info/how-to-place-order" className="text-sm underline">
              How to Place an Order
            </Link>
          </SheetClose>
        </div>
        <div className="ml-5">
          <SheetClose asChild>
            <Link href="/info/return-policy" className="text-sm underline">
              Return Policy
            </Link>
          </SheetClose>
        </div>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <Link href="/search" key="all" className="ml-5">
          <SheetClose asChild>
            <p>All</p>
          </SheetClose>
          <Separator className="my-2 mr-5 text-black" />
        </Link>
        {props.collections.map((a) => {
          return (
            <Link href={`/search?col=${encodeURIComponent(a as string)}`} key={`${a}`} className="ml-5">
              <SheetClose asChild>
                <p>{a}</p>
              </SheetClose>
              <Separator className="my-2 mr-5 text-black" />
            </Link>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
