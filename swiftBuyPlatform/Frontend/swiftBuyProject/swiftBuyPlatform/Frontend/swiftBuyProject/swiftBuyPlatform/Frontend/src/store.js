import { productLookup } from "./catalog.js";
import { state, writeState } from "./state.js";

export function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.colorScheme = state.theme;
}

export function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  writeState("theme", state.theme);
  applyTheme();
}

export function getCartItemKey(item) {
  return `${item.productId}::${item.selectedColor || ""}::${item.selectedSize || ""}`;
}

export function getDetailedCartItems() {
  return state.cart
    .map((item) => {
      const product = productLookup.get(item.productId);
      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        key: getCartItemKey(item),
        lineTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);
}

export function getCartCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal() {
  return getDetailedCartItems().reduce(
    (total, item) => total + item.lineTotal,
    0,
  );
}

export function addToCart(
  productId,
  quantity = 1,
  selectedColor = "",
  selectedSize = "",
) {
  const existing = state.cart.find(
    (item) =>
      item.productId === productId &&
      (item.selectedColor || "") === selectedColor &&
      (item.selectedSize || "") === selectedSize,
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      productId,
      quantity,
      selectedColor,
      selectedSize,
    });
  }

  writeState("cart", state.cart);
}

export function updateCartQuantity(cartKey, delta) {
  const item = state.cart.find((entry) => getCartItemKey(entry) === cartKey);
  if (!item) {
    return;
  }

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeCartItem(cartKey);
    return;
  }

  writeState("cart", state.cart);
}

export function removeCartItem(cartKey) {
  state.cart = state.cart.filter((item) => getCartItemKey(item) !== cartKey);
  writeState("cart", state.cart);
}

export function clearCart() {
  state.cart = [];
  writeState("cart", state.cart);
}

export function toggleWishlist(productId) {
  if (state.wishlist.includes(productId)) {
    state.wishlist = state.wishlist.filter((id) => id !== productId);
  } else {
    state.wishlist = [...state.wishlist, productId];
  }
  writeState("wishlist", state.wishlist);
}

export function persistOrders() {
  writeState("orders", state.orders);
}

export function persistSellerProfile() {
  writeState("seller", state.seller);
}

export function persistUser() {
  writeState("user", state.user);
}

export function persistListingView() {
  writeState("listingView", state.listingView);
}
