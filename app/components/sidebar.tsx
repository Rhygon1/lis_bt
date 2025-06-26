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
        {(user && customData.admin == true) ? (
          <Link href="/admin" className="ml-4 mt-5">
            <Button>Make product</Button>
          </Link>
        ) : (
          <div className="mt-5"></div>
        )}
        <CountrySelector></CountrySelector>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div key="all" className="ml-5">
          <SheetClose asChild>
            <Link href={`/search`}>All</Link>
          </SheetClose>
          <Separator className="my-2 mr-5 text-black" />
        </div>
        {props.collections.map((a) => {
          return (
            <div key={`${a}`} className="ml-5">
              <SheetClose asChild>
                <Link
                  href={`/search?col=${encodeURIComponent(a as string)}`}
                >{`${a}`}</Link>
              </SheetClose>
              <Separator className="my-2 mr-5 text-black" />
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
