import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItemProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex transition items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            {session.data?.user ? (
              <Button
                className="justify-start border-l border-t-0 border-b-0 border-r-0 w-full  bg-black text-white hover:bg-pink-400 hover:text-black transition text-lg rounded-none"
                variant={"secondary"}
                asChild
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  className="justify-start border-l border-t-0 border-b-0 border-r-0 w-full  bg-white hover:bg-pink-400 transition text-lg rounded-none"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={"/sign-in"}>Log in</Link>
                </Button>
                <Button
                  className="justify-start border-l border-t-0 border-b-0 border-r-0 w-full  bg-black text-white hover:bg-pink-400 hover:text-black transition text-lg rounded-none"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={"sign-up"}>Start Selling</Link>
                </Button>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
