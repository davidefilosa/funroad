import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CheckoutItemProps {
  isLast: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantName,
  tenantUrl,
  price,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <Link href={productUrl}>
        <div className="overflow-hidden border-r">
          <div className="relative aspect-square h-full">
            <Image
              fill
              alt={name}
              src={imageUrl || "/profile.jpg"}
              className="object-cover"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-between py-4">
        <div>
          <Link href={tenantUrl}>
            <h4 className="font-bold underline">{tenantName}</h4>
          </Link>
          <Link href={productUrl}>
            <p className="font-medium underline">{name}</p>
          </Link>
        </div>
        <div className="font-bold">
          Quantity:<span> {1}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between py-4">
        <div className="font-medium">{formatPrice(price)}</div>
        <button
          type="button"
          className="underline cursor-pointer"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
