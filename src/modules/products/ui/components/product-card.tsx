"use client";

import { formatPrice, generateTenantUrl } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
  tenantSlug: string;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
  tenantSlug,
}: ProductCardProps) => {
  const router = useRouter();
  return (
    <Link href={`/tenants/${tenantSlug}/products/${id}`}>
      <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="relative aspect-square">
          <Image alt={name} src={imageUrl || "/auth.png"} fill />
        </div>
        <div className="flex flex-col p-4 border-y gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2">
            {authorImageUrl && (
              <Image
                alt={authorUsername}
                src={authorImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px] aspect-square object-cover"
              />
            )}
            <div
              className="text-sm underline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = generateTenantUrl(tenantSlug);
                router.push(url);
              }}
            >
              {authorUsername}
            </div>
          </div>
          {reviewCount && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 fill-black" />
              <div className="text-sm">{reviewRating}</div>
              <div className="text-sm">({reviewCount})</div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 bg-pink-400 border w-fit border-black ">
            <p className="text-sm font-medium">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
  );
};
