'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User, Heart } from "lucide-react";
import AppSidebar from "./sidebar";
import Link from "next/link";
import SearchBar from "./search";

type propsType = {
  collections: string[]
}

export default function Header(props: propsType) {

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="w-1/4">
        <AppSidebar {...props}></AppSidebar>
        
      </div>
      <Link href="/">
        <p className="font-[Overpass] font-bold text-lg">LIS BOUTIQUE</p>
      </Link>
      <div className="flex w-1/4 justify-end gap-3">
        <SearchBar></SearchBar>
        <SignedOut>
          <SignInButton>
            <User />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Heart></Heart>
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