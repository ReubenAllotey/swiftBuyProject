import "./styles.css";

import { heroSlides } from "./data.js";
import { productLookup } from "./catalog.js";
import { renderShell } from "./components.js";
import { icon } from "./icons.js";
import { ui, state, createDefaultCheckoutState, createDefaultSellerState } from "./state.js";
import {
  addToCart,
  applyTheme,
  clearCart,
  getCartItemKey,
  getCartSubtotal,
  getDetailedCartItems,
  persistListingView,
  persistOrders,
  persistSellerProfile,
  persistUser,
  removeCartItem,
  toggleTheme,
  toggleWishlist,
  updateCartQuantity,
} from "./store.js";
import { getInternalPath } from "./utils.js";
import { renderHomePage } from "./pages/home.js";
import { renderProductsPage, renderProductDetailPage } from "./pages/catalog.js";
import { renderCartPage, renderOrderHistoryPage, renderWishlistPage } from "./pages/cart.js";
import { renderCheckoutPage } from "./pages/checkout.js";
import {
  renderAboutPage,
  renderAddProductPage,
  renderContactPage,
  renderFaqPage,
  renderLoginPage,
  renderNotFoundPage,
  renderOrderConfirmationPage,
  renderProfilePage,
  renderRegisterPage,
} from "./pages/static.js";

const appRoot = document.querySelector("#app");
const toastRegion = document.querySelector("#toast-region");

init();

function init() {
  applyTheme();
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("submit", handleDocumentSubmit);
  document.addEventListener("change", handleDocumentChange);
  document.addEventListener("input", handleDocumentInput);
  window.addEventListener("popstate", () => {
    resetRouteUi();
    render();
  });
  render();
}

function matchRoute(pathname) {
  const routes = [
    { name: "home", pattern: /^\/$/, title: "Home", render: () => renderHomePage() },
    { name: "products", pattern: /^\/products$/, title: "Products", render: () => renderProductsPage() },
    { name: "product", pattern: /^\/product\/([^/]+)$/, title: "Product Detail", render: ([id]) => renderProductDetailPage(id) },
    { name: "cart", pattern: /^\/cart$/, title: "Cart", render: () => renderCartPage() },
    { name: "checkout", pattern: /^\/checkout$/, title: "Checkout", render: () => renderCheckoutPage() },
    { name: "order-confirmation", pattern: /^\/order-confirmation$/, title: "Order Confirmed", render: () => renderOrderConfirmationPage() },
    { name: "login", pattern: /^\/login$/, title: "Sign In", render: () => renderLoginPage() },
    { name: "register", pattern: /^\/register$/, title: "Create Account", render: () => renderRegisterPage() },
    { name: "profile", pattern: /^\/profile$/, title: "My Account", render: () => renderProfilePage() },
    { name: "add-product", pattern: /^\/add-product$/, title: "Add Product", render: () => renderAddProductPage() },
    { name: "order-history", pattern: /^\/order-history$/, title: "Order History", render: () => renderOrderHistoryPage() },
    { name: "wishlist", pattern: /^\/wishlist$/, title: "Wishlist", render: () => renderWishlistPage() },
    { name: "about", pattern: /^\/about$/, title: "About", render: () => renderAboutPage() },
    { name: "contact", pattern: /^\/contact$/, title: "Contact", render: () => renderContactPage() },
    { name: "faq", pattern: /^\/faq$/, title: "FAQ", render: () => renderFaqPage() },
  ];

  for (const route of routes) {
    const match = pathname.match(route.pattern);
    if (match) {
      return { name: route.name, title: route.title, content: route.render(match.slice(1)) };
    }
  }

  return { name: "not-found", title: "Not Found", content: renderNotFoundPage() };
}

function render() {
  clearPageEffects();

  const route = matchRoute(window.location.pathname);
  document.title = `${route.title} | SwiftBuy`;
  appRoot.innerHTML = renderShell(route.name, route.content);

  initRevealAnimations();

  if (route.name === "home") {
    initHeroCarousel();
    initCountdown();
  }
}

function clearPageEffects() {
  if (ui.heroTimer) {
    window.clearInterval(ui.heroTimer);
    ui.heroTimer = null;
  }
  if (ui.countdownTimer) {
    window.clearInterval(ui.countdownTimer);
    ui.countdownTimer = null;
  }
  if (ui.revealObserver) {
    ui.revealObserver.disconnect();
    ui.revealObserver = null;
  }
}

function resetRouteUi() {
  ui.mobileSearchOpen = false;
  ui.mobileFilterOpen = false;
  if (window.location.pathname !== "/checkout") {
    ui.checkout = createDefaultCheckoutState();
  }
}

function navigate(path, options = {}) {
  const { replace = false, scroll = true } = options;
  const nextPath = path || "/";

  if (`${window.location.pathname}${window.location.search}` !== nextPath) {
    window.history[replace ? "replaceState" : "pushState"]({}, "", nextPath);
    resetRouteUi();
    render();
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleDocumentClick(event) {
  const actionElement = event.target.closest("[data-action]");
  if (actionElement) {
    event.preventDefault();
    handleAction(actionElement);
    return;
  }

  const link = event.target.closest("a[href]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const internalPath = getInternalPath(link.href);
  if (!internalPath) {
    return;
  }

  event.preventDefault();
  navigate(internalPath);
}

function handleDocumentSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.dataset.form) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(form);

  switch (form.dataset.form) {
    case "header-search": {
      const searchValue = String(formData.get("search") || "").trim();
      const params = new URLSearchParams();
      if (searchValue) {
        params.set("search", searchValue);
      }
      navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
      return;
    }
    case "newsletter":
      showToast("Thanks for joining the SwiftBuy newsletter.", "success");
      form.reset();
      return;
    case "promo-code": {
      const code = String(formData.get("promoCode") || "").trim().toUpperCase();
      if (!code) {
        showToast("Enter a promo code to continue.", "info");
      } else if (code === "SAVE10") {
        ui.promoCode = code;
        showToast("Promo code applied: 10% off.", "success");
        render();
      } else {
        showToast("That promo code is not valid in this demo.", "error");
      }
      return;
    }
    case "checkout-shipping":
      if (!validateShippingStep()) {
        showToast("Please complete the required shipping fields.", "error");
        return;
      }
      ui.checkout.step = 2;
      render();
      return;
    case "checkout-payment":
      if (
        ui.checkout.paymentMethod === "card" &&
        (!ui.checkout.card.cardNumber ||
          !ui.checkout.card.cardName ||
          !ui.checkout.card.expiry ||
          !ui.checkout.card.cvv)
      ) {
        showToast("Complete all card details before continuing.", "error");
        return;
      }
      ui.checkout.step = 3;
      render();
      return;
    case "login": {
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      if (!email || !password) {
        showToast("Please enter your email and password.", "error");
        return;
      }
      const name = email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      state.user = {
        name,
        email,
        username: email.split("@")[0].toLowerCase(),
        phone: "",
      };
      persistUser();
      showToast("Welcome back to SwiftBuy.", "success");
      navigate("/profile");
      return;
    }
    case "register": {
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirmPassword") || "");
      if (!name || !email || !password || !confirmPassword) {
        showToast("Please complete all registration fields.", "error");
      } else if (password !== confirmPassword) {
        showToast("Passwords do not match.", "error");
      } else {
        state.user = {
          name,
          email,
          username: email.split("@")[0].toLowerCase(),
          phone: "",
        };
        persistUser();
        showToast("Account created successfully.", "success");
        navigate("/profile");
      }
      return;
    }
    case "contact":
      showToast("Message sent. We will get back to you soon.", "success");
      form.reset();
      return;
    case "add-product": {
      if (!state.user) {
        showToast("Sign in to list your first product.", "info");
        navigate("/login");
        return;
      }

      const name = String(formData.get("name") || "").trim();
      const price = Number(formData.get("price") || 0);
      const originalPrice = Number(formData.get("originalPrice") || 0);
      const category = String(formData.get("category") || "").trim();
      const brand = String(formData.get("brand") || "").trim();
      const inventoryStatus = String(formData.get("inventoryStatus") || "In stock").trim();
      const imageUrl = String(formData.get("imageUrl") || "").trim();
      const description = String(formData.get("description") || "").trim();

      if (!name || !category || !brand || !description || price <= 0) {
        showToast("Please complete the required product details.", "error");
        return;
      }

      if (state.seller.ownerEmail && state.seller.ownerEmail !== state.user.email) {
        state.seller = createDefaultSellerState();
      }

      state.seller.ownerEmail = state.user.email;
      state.seller.products = [
        {
          id: `seller-${Date.now()}`,
          name,
          price,
          originalPrice: originalPrice > 0 ? originalPrice : null,
          category,
          brand,
          inventoryStatus,
          imageUrl,
          description,
          createdAt: new Date().toISOString(),
        },
        ...state.seller.products,
      ];
      persistSellerProfile();

      showToast(`"${name}" is now live in your seller dashboard.`, "success");
      form.reset();
      navigate("/profile");
      return;
    }
    default:
      return;
  }
}

function handleDocumentChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const filterForm = target.closest("[data-filter-form]");
  if (filterForm instanceof HTMLFormElement) {
    applyFiltersFromForm(filterForm);
    return;
  }

  if (target instanceof HTMLSelectElement && target.dataset.role === "sort-products") {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", target.value);
    params.set("page", "1");
    navigate(`/products?${params.toString()}`, { scroll: true });
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.checkoutField) {
    setCheckoutValue(target.dataset.checkoutField, target.value);
    if (target.dataset.checkoutField === "paymentMethod") {
      render();
    }
  }
}

function handleDocumentInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.checkoutField) {
    setCheckoutValue(target.dataset.checkoutField, target.value);
    return;
  }

  const filterForm = target.closest("[data-filter-form]");
  if (filterForm instanceof HTMLFormElement && target instanceof HTMLInputElement) {
    const key = target.name === "minPrice" ? "min" : target.name === "maxPrice" ? "max" : null;
    if (key) {
      const label = filterForm.querySelector(`[data-price-label="${key}"]`);
      if (label) {
        label.textContent = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(target.value));
      }
    }
  }
}

function handleAction(element) {
  switch (element.dataset.action) {
    case "toggle-theme":
      toggleTheme();
      render();
      return;
    case "toggle-mobile-search":
      ui.mobileSearchOpen = !ui.mobileSearchOpen;
      render();
      return;
    case "hero-prev":
      ui.heroIndex = (ui.heroIndex - 1 + heroSlides.length) % heroSlides.length;
      syncHeroCarousel();
      resetHeroTimer();
      return;
    case "hero-next":
      ui.heroIndex = (ui.heroIndex + 1) % heroSlides.length;
      syncHeroCarousel();
      resetHeroTimer();
      return;
    case "hero-dot":
      ui.heroIndex = Number(element.dataset.index || 0);
      syncHeroCarousel();
      resetHeroTimer();
      return;
    case "add-to-cart":
      addToCart(element.dataset.productId);
      showToast("Added to cart.", "success");
      render();
      return;
    case "toggle-wishlist":
      toggleWishlist(element.dataset.productId);
      showToast(
        state.wishlist.includes(element.dataset.productId)
          ? "Saved to wishlist."
          : "Removed from wishlist.",
        "info",
      );
      render();
      return;
    case "open-filters":
      ui.mobileFilterOpen = true;
      render();
      return;
    case "close-filters":
      ui.mobileFilterOpen = false;
      render();
      return;
    case "clear-filters": {
      const params = new URLSearchParams(window.location.search);
      const searchValue = params.get("search");
      const nextParams = new URLSearchParams();
      if (searchValue) {
        nextParams.set("search", searchValue);
      }
      navigate(`/products${nextParams.toString() ? `?${nextParams.toString()}` : ""}`);
      return;
    }
    case "set-listing-view":
      state.listingView = element.dataset.view === "list" ? "list" : "grid";
      persistListingView();
      render();
      return;
    case "change-page": {
      const params = new URLSearchParams(window.location.search);
      params.set("page", element.dataset.page || "1");
      navigate(`/products?${params.toString()}`);
      return;
    }
    case "select-detail-image": {
      const root = element.closest("[data-product-detail]");
      const mainImage = root?.querySelector("[data-detail-main-image]");
      root?.querySelectorAll("[data-action='select-detail-image']").forEach((button) => {
        button.classList.remove("is-active");
      });
      element.classList.add("is-active");
      if (mainImage) {
        mainImage.setAttribute("src", element.dataset.image || "");
      }
      return;
    }
    case "select-detail-variant": {
      const root = element.closest("[data-product-detail]");
      const field = element.dataset.field;
      root?.querySelectorAll(`[data-action="select-detail-variant"][data-field="${field}"]`).forEach((button) => {
        button.classList.remove("is-active");
      });
      element.classList.add("is-active");
      const hidden = root?.querySelector(`[data-detail-field="${field}"]`);
      const label = root?.querySelector(`[data-detail-label="${field}"]`);
      if (hidden) {
        hidden.value = element.dataset.value || "";
      }
      if (label) {
        label.textContent = element.dataset.value || "";
      }
      return;
    }
    case "change-detail-quantity": {
      const root = element.closest("[data-product-detail]");
      const hidden = root?.querySelector('[data-detail-field="quantity"]');
      if (!hidden) {
        return;
      }
      const nextValue = Math.max(1, Number(hidden.value || "1") + Number(element.dataset.delta || 0));
      hidden.value = String(nextValue);
      root.querySelector("[data-detail-quantity]").textContent = String(nextValue);
      root.querySelector("[data-detail-quantity-label]").textContent = String(nextValue);
      return;
    }
    case "detail-add-to-cart":
      handleDetailPurchase(false);
      return;
    case "detail-buy-now":
      handleDetailPurchase(true);
      return;
    case "change-cart-quantity":
      updateCartQuantity(decodeURIComponent(element.dataset.cartKey || ""), Number(element.dataset.delta || 0));
      render();
      return;
    case "remove-cart-item":
      removeCartItem(decodeURIComponent(element.dataset.cartKey || ""));
      showToast("Item removed from cart.", "info");
      render();
      return;
    case "clear-cart":
      if (window.confirm("Clear all items from the cart?")) {
        clearCart();
        ui.promoCode = "";
        render();
      }
      return;
    case "go-checkout":
      navigate("/checkout");
      return;
    case "checkout-back":
      ui.checkout.step = Math.max(1, ui.checkout.step - 1);
      render();
      return;
    case "place-order":
      placeOrder();
      return;
    case "toggle-password": {
      const target = document.getElementById(element.dataset.target || "");
      if (target instanceof HTMLInputElement) {
        const isPassword = target.type === "password";
        target.type = isPassword ? "text" : "password";
        element.textContent = isPassword ? "Hide" : "Show";
      }
      return;
    }
    case "logout":
      state.user = null;
      persistUser();
      showToast("You have been logged out.", "info");
      navigate("/");
      return;
    case "show-toast":
      showToast(element.dataset.message || "This section is coming soon.", "info");
      return;
    case "view-order-details":
      showToast("Order detail view is mocked in this demo.", "info");
      return;
    case "go-back":
      window.history.back();
      return;
    default:
      return;
  }
}

function handleDetailPurchase(shouldNavigateToCart) {
  const root = document.querySelector("[data-product-detail]");
  if (!root) {
    return;
  }

  const product = productLookup.get(root.dataset.productId);
  if (!product) {
    return;
  }

  const selectedColor = root.querySelector('[data-detail-field="selectedColor"]')?.value || "";
  const selectedSize = root.querySelector('[data-detail-field="selectedSize"]')?.value || "";
  const quantity = Number(root.querySelector('[data-detail-field="quantity"]')?.value || "1");

  if (product.colors?.length && !selectedColor) {
    showToast("Please select a color before continuing.", "error");
    return;
  }
  if (product.sizes?.length && !selectedSize) {
    showToast("Please select a size before continuing.", "error");
    return;
  }

  addToCart(product.id, quantity, selectedColor, selectedSize);
  showToast("Added to cart.", "success");

  if (shouldNavigateToCart) {
    navigate("/cart");
  } else {
    render();
  }
}

function setArrayParam(params, key, values) {
  if (values.length) {
    params.set(key, values.join(","));
  } else {
    params.delete(key);
  }
}

function applyFiltersFromForm(form) {
  const data = new FormData(form);
  const params = new URLSearchParams(window.location.search);

  setArrayParam(params, "category", data.getAll("category").map(String));
  setArrayParam(params, "brand", data.getAll("brand").map(String));

  const minPrice = Number(data.get("minPrice") || 0);
  const maxPrice = Number(data.get("maxPrice") || 2000);
  const rating = Number(data.get("rating") || 0);

  minPrice > 0 ? params.set("minPrice", String(minPrice)) : params.delete("minPrice");
  maxPrice < 2000 ? params.set("maxPrice", String(maxPrice)) : params.delete("maxPrice");
  rating > 0 ? params.set("rating", String(rating)) : params.delete("rating");
  params.set("page", "1");

  navigate(`/products?${params.toString()}`, { scroll: false });
}

function setCheckoutValue(path, value) {
  const [section, key] = path.split(".");
  if (key) {
    ui.checkout[section][key] = value;
  } else {
    ui.checkout[section] = value;
  }
}

function validateShippingStep() {
  const shipping = ui.checkout.shipping;
  return [
    shipping.fullName,
    shipping.email,
    shipping.phone,
    shipping.addressLine1,
    shipping.city,
    shipping.state,
    shipping.zipCode,
    shipping.country,
  ].every(Boolean);
}

function placeOrder() {
  const items = getDetailedCartItems();
  if (!items.length) {
    showToast("Your cart is empty.", "error");
    navigate("/cart");
    return;
  }

  const subtotal = getCartSubtotal();
  const order = {
    id: String(Math.floor(100000 + Math.random() * 900000)),
    date: new Date().toISOString().slice(0, 10),
    status: "Processing",
    total: subtotal + 10 + subtotal * 0.08,
    itemsCount: items.length,
    items: items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  };

  state.orders = [order, ...state.orders];
  ui.lastOrderId = order.id;
  ui.checkout = createDefaultCheckoutState();
  ui.promoCode = "";
  clearCart();
  persistOrders();
  showToast("Order placed successfully.", "success");
  navigate("/order-confirmation");
}

function initHeroCarousel() {
  syncHeroCarousel();
  ui.heroTimer = window.setInterval(() => {
    ui.heroIndex = (ui.heroIndex + 1) % heroSlides.length;
    syncHeroCarousel();
  }, 5500);
}

function syncHeroCarousel() {
  document.querySelectorAll("[data-hero-slide]").forEach((slide, index) => {
    slide.classList.toggle("is-active", index === ui.heroIndex);
  });
  document.querySelectorAll(".hero-dot").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === ui.heroIndex);
  });
}

function resetHeroTimer() {
  if (ui.heroTimer) {
    window.clearInterval(ui.heroTimer);
  }
  ui.heroTimer = window.setInterval(() => {
    ui.heroIndex = (ui.heroIndex + 1) % heroSlides.length;
    syncHeroCarousel();
  }, 5500);
}

function getCountdownParts() {
  if (Date.now() >= ui.flashSaleEndsAt) {
    ui.flashSaleEndsAt = Date.now() + 13 * 60 * 60 * 1000;
  }
  const totalSeconds = Math.floor((ui.flashSaleEndsAt - Date.now()) / 1000);
  return {
    hours: String(Math.floor(totalSeconds / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"),
    seconds: String(totalSeconds % 60).padStart(2, "0"),
  };
}

function initCountdown() {
  syncCountdown();
  ui.countdownTimer = window.setInterval(syncCountdown, 1000);
}

function syncCountdown() {
  const countdown = getCountdownParts();
  const hours = document.querySelector('[data-countdown="hours"]');
  const minutes = document.querySelector('[data-countdown="minutes"]');
  const seconds = document.querySelector('[data-countdown="seconds"]');
  if (hours) hours.textContent = countdown.hours;
  if (minutes) minutes.textContent = countdown.minutes;
  if (seconds) seconds.textContent = countdown.seconds;
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) {
    return;
  }

  ui.revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          ui.revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealItems.forEach((item) => ui.revealObserver.observe(item));
}

function showToast(message, tone = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${tone}`;
  toast.textContent = message;
  toastRegion.appendChild(toast);

  window.setTimeout(() => toast.classList.add("is-leaving"), 2800);
  window.setTimeout(() => toast.remove(), 3300);
}
