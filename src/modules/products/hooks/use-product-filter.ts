import { useQueryStates } from "nuqs";
import { serachParams } from "./searchParams";

export function useProductFilter() {
  return useQueryStates(serachParams);
}
