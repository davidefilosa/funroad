import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from "zustand/react/shallow";

export const useCart = (tenantSlug: string) => {
  //const {
  // getCartByTenant,
  // addProductToCart,
  // removeProductFromCart,
  // clearAllCarts,
  // clearCart,
  //} = useCartStore();

  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);
  const clearCart = useCartStore((state) => state.clearCart);

  const productIds = useCartStore(
    useShallow((state) => state.tenantsCarts[tenantSlug]?.productIds || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProductFromCart(tenantSlug, productId);
      } else {
        addProductToCart(tenantSlug, productId);
      }
    },
    [addProductToCart, removeProductFromCart, productIds, tenantSlug]
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const clearTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [clearCart, tenantSlug]);

  const handleaddProductToCart = useCallback(
    (productId: string) => {
      addProductToCart(tenantSlug, productId);
    },
    [addProductToCart, tenantSlug]
  );

  const handleRemoveProductFromCart = useCallback(
    (productId: string) => {
      removeProductFromCart(tenantSlug, productId);
    },
    [removeProductFromCart, tenantSlug]
  );

  return {
    productIds,
    addProductToCart: handleaddProductToCart,
    removeProductFromCart: handleRemoveProductFromCart,
    clearAllCarts,
    clearCart: clearTenantCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
