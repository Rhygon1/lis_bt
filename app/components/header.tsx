"use client";

import { User, Heart, LogOut } from "lucide-react";
import AppSidebar from "./sidebar";
import Link from "next/link";
import SearchBar from "./search";
import { useUser } from "./auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomAvatar from "./avatar";
import { Button } from "@/components/ui/button";
import { signout } from "@/utils/supabase/auth-actions";
import { useRouter } from "next/navigation";

type propsType = {
  collections: string[];
};

export default function Header(props: propsType) {
  const { user, customData, refetch } = useUser();
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="w-1/3">
        <AppSidebar {...props}></AppSidebar>
      </div>
      <Link href="/" className="w-1/3">
        <p className="font-[Overpass] font-bold text-nowrap">LIS BOUTIQUE</p>
      </Link>
      <div className="flex w-1/3 justify-end gap-2 items-center">
        <SearchBar></SearchBar>
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
                      <p className="text-left text-sm">{customData.fullName}</p>
                    )}
                    <p className="text-left font-thin text-sm">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white py-6 w-full font-thin flex justify-start gap-4"
                  onClick={async () => {
                    setIsSigningOut(true)
                    await signout()
                    await refetch()
                    setIsSigningOut(false)
                  }}
                  disabled={isSigningOut}
                >
                  <LogOut className="ml-1" color="black" />
                  <p>{isSigningOut ? "Signing out..." : "Sign Out"}</p>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <button onClick={() => router.push('/login')}>
            <User></User>
          </button>
        )}
        <Heart className=""></Heart>
      </div>
    </header>
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
