import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

export const Footer = () => {
  return (
    <footer className="">
      <div className="border-t font-medium bg-white min-h-24 max-w-(--breackpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-base">
          Powered by{" "}
          <Link href={"/"}>
            <span className={cn("font-bold text-xl", poppins.className)}>
              funroad
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
};
