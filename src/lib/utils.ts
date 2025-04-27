import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantUrl(slug: string) {
  return `/tenants/${slug}`;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
