import { CheckoutView } from "@/modules/checkout/ui/view/checkout-view";
import React from "react";

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { slug } = await params;
  return <CheckoutView slug={slug} />;
};

export default CheckoutPage;
