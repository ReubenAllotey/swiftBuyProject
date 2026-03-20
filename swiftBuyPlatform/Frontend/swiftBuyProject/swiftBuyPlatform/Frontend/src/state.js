import { mockOrders, products } from "./data.js";

export const STORAGE_KEYS = {
  theme: "swiftbuy-theme",
  cart: "swiftbuy-cart",
  wishlist: "swiftbuy-wishlist",
  user: "swiftbuy-user",
  orders: "swiftbuy-orders",
  seller: "swiftbuy-seller",
  listingView: "swiftbuy-listing-view",
};

const productIds = new Set(products.map((product) => product.id));

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createDefaultCheckoutState() {
  return {
    step: 1,
    shipping: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    paymentMethod: "card",
    card: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
  };
}

export function createDefaultSellerState() {
  return {
    ownerEmail: "",
    products: [],
    ordersReceived: 0,
    earnings: 0,
  };
}

export const state = {
  theme: readStorage(STORAGE_KEYS.theme, "dark"),
  cart: sanitizeCart(readStorage(STORAGE_KEYS.cart, [])),
  wishlist: sanitizeWishlist(readStorage(STORAGE_KEYS.wishlist, [])),
  user: readStorage(STORAGE_KEYS.user, null),
  orders: readStorage(STORAGE_KEYS.orders, mockOrders),
  seller: sanitizeSeller(readStorage(STORAGE_KEYS.seller, createDefaultSellerState())),
  listingView: readStorage(STORAGE_KEYS.listingView, "grid"),
};

export const ui = {
  mobileSearchOpen: false,
  mobileFilterOpen: false,
  promoCode: "",
  heroIndex: 0,
  heroTimer: null,
  countdownTimer: null,
  revealObserver: null,
  flashSaleEndsAt: Date.now() + 13 * 60 * 60 * 1000,
  checkout: createDefaultCheckoutState(),
  lastOrderId: null,
};

function sanitizeCart(cart) {
  return Array.isArray(cart)
    ? cart.filter((item) => item && productIds.has(item.productId))
    : [];
}

function sanitizeWishlist(list) {
  return Array.isArray(list)
    ? list.filter((id) => typeof id === "string" && productIds.has(id))
    : [];
}

function sanitizeSeller(value) {
  const fallback = createDefaultSellerState();

  if (!value || typeof value !== "object") {
    return fallback;
  }

  return {
    ownerEmail: typeof value.ownerEmail === "string" ? value.ownerEmail : "",
    products: Array.isArray(value.products) ? value.products : [],
    ordersReceived: Number(value.ordersReceived) || 0,
    earnings: Number(value.earnings) || 0,
  };
}

export function writeState(key, value) {
  writeStorage(STORAGE_KEYS[key], value);
}
