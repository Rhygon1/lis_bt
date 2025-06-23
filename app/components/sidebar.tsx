"use client";

import {
  Sheet,
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
import { useUser, SignedIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type propsType = {
  collections: string[];
};

export default function AppSidebar(props: propsType) {
  const { user } = useUser();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="flex justify-start"></Menu>
      </SheetTrigger>
      <SheetContent side="left">
        <SignedIn>
          {user?.publicMetadata.admin == true && (
            <Link href="/admin" className="ml-4 mt-5">
              <Button>Make product</Button>
            </Link>
          )}
        </SignedIn>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        {props.collections.map((a) => {
          return (
            <div key={`${a}`} className="ml-5">
              <Link href={`/search?col=${a}`}>{`${a}`}</Link>
              <Separator className="my-2 mr-5 text-black" />
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
