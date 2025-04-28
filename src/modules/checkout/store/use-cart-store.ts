import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TenantCart {
  productIds: string[];
}

interface CartState {
  tenantsCarts: Record<string, TenantCart>;
  addProductToCart: (tenantSlug: string, productId: string) => void;
  removeProductFromCart: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantsCarts: {},
      addProductToCart: (tenantSlug: string, productId: string) =>
        set((state) => ({
          tenantsCarts: {
            ...state.tenantsCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantsCarts[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProductFromCart: (tenantSlug: string, productId: string) =>
        set((state) => ({
          tenantsCarts: {
            ...state.tenantsCarts,
            [tenantSlug]: {
              productIds:
                state.tenantsCarts[tenantSlug]?.productIds.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      clearCart: (tenantSlug: string) =>
        set((state) => ({
          tenantsCarts: {
            ...state.tenantsCarts,
            [tenantSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () =>
        set(() => ({
          tenantsCarts: {},
        })),
      getCartByTenant: (tenantSlug: string) =>
        get().tenantsCarts[tenantSlug]?.productIds || [],
    }),

    { name: "funroad-cart", storage: createJSONStorage(() => localStorage) }
  )
);
