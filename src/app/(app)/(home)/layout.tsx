import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilter } from "./search-filter";
import configPromise from "@payload-config";
import { getPayload } from "payload";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: { parent: { exists: false } },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({ ...doc })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
