import type { User } from "@/payload-types";
import { ClientUser } from "payload";

export const isSuperUser = (user: User | ClientUser | null) => {
  return Boolean(user?.roles?.includes("super-admin"));
};
