import React from "react";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-14">
      {/* Logo  */}
      <div>
        <h1 className="font-bold text-2xl">
          YT<span className="text-red-500">shorts</span>
        </h1>
      </div>

      {/* Searching Feature  */}
      <div className="w-1/2 hidden md:block">
        <Input type="text" placeholder="Search" />
      </div>

      {/* Account Feature  */}
      <div className="flex items-center gap-4">
        <Link href={"/upload"}>
          <Button variant={"outline"} className="rounded-full">
            {" "}
            <Plus /> Create
          </Button>
        </Link>

        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
         <ModeToggle/>
        </header>

      </div>
    </div>
  );
};

export default Navbar;
