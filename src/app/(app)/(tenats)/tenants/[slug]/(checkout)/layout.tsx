import { Navbar } from "@/modules/checkout/ui/components/navbar";
import { Footer } from "@/modules/tenants/ui/components/footer";
import React from "react";

interface CheckoutLayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

const CheckoutLayout = async ({ children, params }: CheckoutLayoutProps) => {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar tenantSlug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breackpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
