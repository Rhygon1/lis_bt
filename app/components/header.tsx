"use client";

import { User, Heart, LogOut } from "lucide-react";
import AppSidebar from "./sidebar";
import Link from "next/link";
import SearchBar from "./search";
import { useUser } from "./auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ScrollingBanner from "./ScrollingBanner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomAvatar from "./avatar";
import { Button } from "@/components/ui/button";
import { signout } from "@/utils/supabase/auth-actions";
import { useRouter } from "next/navigation";
import CartSidebar from "./cartSidebar";
import { useCart } from "./cartContext";

type propsType = {
  collections?: string[];
};

export default function Header(props: propsType) {
  const { user, customData, refetch } = useUser();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const {cart} = useCart();

  const totalItemsInCart = cart.length

  return (
    <>
      <ScrollingBanner></ScrollingBanner>
      <header className="flex justify-between w-full items-center py-4 px-3 gap-8 h-16 max-w-7xl mx-auto md:justify-between">
        <div className="flex justify-start items-center gap-4">
          <AppSidebar
            collections={
              props.collections || [
                "Readymade Suits",
                "Anarkalis",
                "Gowns",
                "Lehangas",
                "Menswear",
                "Girls Kids Dresses",
                "Boys Kids Dresses",
                "Jewellery",
                "Sarees",
                "Blouses",
                "Indo Western",
              ]
            }
          ></AppSidebar>
          <SearchBar></SearchBar>
        </div>
        <Link href="/" className="flex justify-center items-center flex-grow">
          <p className="font-[Overpass] font-bold text-nowrap text-xl md:text-2xl">
            LIS BOUTIQUE
          </p>
        </Link>
        <div className="flex justify-end gap-4 items-center">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-fit h-fit">
                  <CustomAvatar></CustomAvatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 mr-10">
                <div className="w-full flex flex-col gap-0">
                  <div className="w-full py-3 ml-2 flex items-center gap-3">
                    <div>
                      <CustomAvatar />
                    </div>
                    <div className="flex flex-col justify-center">
                      {customData.fullName && (
                        <p className="text-left text-sm">
                          {customData.fullName}
                        </p>
                      )}
                      <p className="text-left font-thin text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-white py-6 w-full font-thin flex justify-start gap-4"
                    onClick={async () => {
                      setIsSigningOut(true);
                      await signout();
                      await refetch();
                      setIsSigningOut(false);
                    }}
                    disabled={isSigningOut}
                  >
                    <LogOut className="ml-1" color="black" />
                    <p className="font-medium h-full text-center flex items-center">
                      {isSigningOut ? "Signing out..." : "Sign Out"}
                    </p>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <button onClick={() => router.push("/login")}>
              <User></User>
            </button>
          )}
          <div className="relative flex items-center">
            <CartSidebar />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItemsInCart}
              </span>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

// readymade suits
// anarkali
// gowns
// lehangas
// menethnic wear
// girls kids dreses
// boys kids dresses
// jewellery
// sarees
// blouses
