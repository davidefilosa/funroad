"use client";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPrice, generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ProductViewProps {
  productId: string;
  slug: string;
}

export const ProductView = ({ productId, slug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  return (
    <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <Suspense fallback={<div>Loading</div>}>
        <div className="px-4 lg:px-12 py-10">
          <div className="border rounded-sm bg-white overflow-hidden">
            <div className="relative aspect-[3.9] border-b">
              <Image
                src={data?.image?.url || "/profile.jpg"}
                alt={data?.name || "cover"}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6">
              <div className="col-span-4">
                <div className="p-6">
                  <h1 className="text-4xl font-medium">{data?.name}</h1>
                </div>
                <div className="border-y flex">
                  <div className="px-6 py-4 flex items-center justify-center border-r">
                    <div className="px-2 py-1 border bg-pink-400 w-fit">
                      <p className="text-base font-medium">
                        {formatPrice(data?.price || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                    <Link href={generateTenantUrl(data?.tenant.slug!)}>
                      <div className="flex items-center gap-2">
                        {data?.tenant.image && (
                          <Image
                            src={data?.tenant.image.url || "/profile.jpg"}
                            alt={data?.tenant.name}
                            width={20}
                            height={20}
                            className="rounded-full border shrink-0 size-[20px] aspect-square object-cover"
                          />
                        )}
                        <p className="text-sm font-medium underline">
                          {data?.tenant.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                    <div className="flex items-center gap-1">
                      <StarRating rating={3} text={`100 ratings`} />
                    </div>
                  </div>
                </div>
                <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
                  <div className="flex items-center gap-1">
                    <StarRating rating={3} text={`100 ratings`} />
                  </div>
                </div>
                <div className="p-6">
                  {data?.description ? (
                    <p>{data.description}</p>
                  ) : (
                    <p className="font-medium text-muted-foreground italic">
                      No description provided
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <div className="border-t lg:border-t-0 lg:border-l h-full">
                  <div className="flex flex-col gap-4 p-6 border-b">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={"elevated"}
                        className="flex-1 bg-pink-400"
                      >
                        Add to cart
                      </Button>
                      <Button className="size-12" variant={"elevated"}>
                        <LinkIcon />
                      </Button>
                    </div>
                    <p className="text-center font-medium">
                      {data?.refundPolicy === "No refund"
                        ? "No refunds"
                        : `${data?.refundPolicy} money back garantee`}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium">Ratings</h3>
                      <div className="flex items-center gap-x-1 font-medium">
                        <StarIcon className="size-4 fill-black" />
                        <p>({5})</p>
                        <p className="text-base">{100} ratings</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <Fragment key={stars}>
                          <div className="font-medium">
                            {stars} {stars === 1 ? "star" : "stars"}
                          </div>
                          <Progress
                            value={5 * Math.random() * 20}
                            className="h-[1lh]"
                          />
                          <div className="font-medium ">{stars * 20}%</div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
