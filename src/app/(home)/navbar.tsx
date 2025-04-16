"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      {children}
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/pricing", children: "Pricing" },
  { href: "/features", children: "Features" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="pl-6 flex items-center">
        <div
          className={cn(
            "text-5xl font-semibold text-black hover:text-pink-400 transition-all flex gap-0",
            poppins.className
          )}
        >
          {"funroad".split("").map((letter, index) => (
            <div
              className={cn(
                "text-black hover:text-pink-400 transition ease-in-out transform hover:-translate-x-[4px] hover:-translate-y-[4px] hover:rotate-z-45 hover:text-shadow-[4px_4px_4px_rgb(0_0_0_/_1)]"
              )}
            >
              {letter}
            </div>
          ))}
        </div>
      </Link>
      <div className="lg:flex items-center gap-4 hidden">
        {navbarItems.map((item) => (
          <NavbarItem
            href={item.href}
            key={item.href}
            isActive={pathname === item.href}
          >
            <Link href={item.href}>{item.children}</Link>
          </NavbarItem>
        ))}
      </div>
    </nav>
  );
};
