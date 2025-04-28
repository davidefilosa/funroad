import { useCartStore } from "../store/use-cart-store";

export const useCart = (tenantSlug: string) => {
  const {
    getCartByTenant,
    addProductToCart,
    removeProductFromCart,
    clearAllCarts,
    clearCart,
  } = useCartStore();

  const productIds = getCartByTenant(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProductFromCart(tenantSlug, productId);
    } else {
      addProductToCart(tenantSlug, productId);
    }
  };

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };
  const clearTenantCart = () => {
    clearCart(tenantSlug);
  };

  return {
    productIds,
    addProductToCart: (productId: string) => {
      addProductToCart(tenantSlug, productId);
    },
    removeProductFromCart: (productId: string) => {
      removeProductFromCart(tenantSlug, productId);
    },
    clearAllCarts,
    clearCart: clearTenantCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
