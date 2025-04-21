"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { motion } from "motion/react";

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

const colors = [
  "#FFB347", // Business & Money
  "#7EC8E3", // Software Development
  "#D8B5FF", // Writing & Publishing
  "#FFE066", // Education
  "#96E6B3", // Self Improvement
  "#FF9AA2", // Fitness & Health
  "#B5B9FF", // Design
  "#FFCAB0", // Drawing & Painting
  "#FFD700", // Music
  "#FF6B6B", // Photography
];

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [randomColor, setRandomColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
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
            <motion.div
              key={index}
              className={cn(
                "text-black transition transform hover:-translate-x-[4px] hover:-translate-y-[4px] hover:text-shadow-[4px_4px_4px_rgb(0_0_0_/_1)]"
              )}
              whileHover={{
                color: randomColor,
              }}
              whileTap={{ color: randomColor }}
              transition={{ duration: 0.1 }}
              onMouseEnter={() =>
                setRandomColor(
                  colors[Math.floor(Math.random() * colors.length)]
                )
              }
              onMouseLeave={() =>
                setRandomColor(
                  colors[Math.floor(Math.random() * colors.length)]
                )
              }
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </Link>
      <NavbarSidebar
        items={navbarItems}
        onOpenChange={setIsSidebarOpen}
        open={isSidebarOpen}
      />
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
      <div className="hidden lg:flex">
        <Button
          className="border-l border-t-0 border-b-0 border-r-0 h-full px-12 bg-white hover:bg-pink-400 transition text-lg rounded-none"
          variant={"secondary"}
          asChild
        >
          <Link href={"/sign-in"}>Log in</Link>
        </Button>
        <Button
          className="border-l border-t-0 border-b-0 border-r-0 h-full px-12 bg-black text-white hover:bg-pink-400 hover:text-black transition text-lg rounded-none"
          variant={"secondary"}
          asChild
        >
          <Link href={"sign-up"}>Start Selling</Link>
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button size={"icon"} onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
