import {
  aiSuggestions,
  categories,
  heroSlides,
  products,
} from "./data.js";
import { icon } from "./icons.js";
import { state, ui } from "./state.js";
import { money, escapeHtml } from "./utils.js";
import { getCartCount } from "./store.js";

export function renderShell(routeName, content) {
  return `
    <div class="app-shell">
      <div class="app-bg app-bg--one"></div>
      <div class="app-bg app-bg--two"></div>
      ${routeName === "home" ? "" : '<div class="promo-bar">Flash deals up to 70% off. Free shipping on orders over $50.</div>'}
      ${renderHeader(routeName)}
      <main class="page-content">${content}</main>
      ${renderFooter()}
      ${renderBottomNav(routeName)}
    </div>
  `;
}

export function renderHeader(routeName) {
  const searchParams = new URLSearchParams(window.location.search);
  const currentSearch = searchParams.get("search") || "";
  const cartCount = getCartCount();
  const wishlistCount = state.wishlist.length;
  const profileActive = routeName === "profile";

  return `
    <header class="site-header">
      <div class="container header-bar">
        <a href="/" class="brand brand--header">
          <span class="brand-mark">${icon("zap", "icon brand-icon")}</span>
          <span class="brand-word">Swift<span>Buy</span></span>
        </a>
        <nav class="desktop-nav" aria-label="Primary">
          ${renderNavLink("/", "Home", routeName === "home")}
          ${renderNavLink(
            "/products",
            "Products",
            routeName === "products" || routeName === "product",
          )}
          ${renderNavLink("/about", "About", routeName === "about")}
          ${renderNavLink("/contact", "Contact", routeName === "contact")}
          <details class="category-menu">
            <summary>
              <span>Categories</span>
              ${icon("chevronDown", "icon tiny-icon")}
            </summary>
            <div class="category-menu__panel">
              ${categories
                .map(
                  (category) =>
                    `<a href="/products?category=${category.slug}" class="category-menu__link">${escapeHtml(category.name)}</a>`,
                )
                .join("")}
            </div>
          </details>
        </nav>
        <form class="header-search desktop-only" data-form="header-search">
          <label class="header-search__field">
            ${icon("search", "icon search-icon")}
            <input
              type="search"
              name="search"
              value="${escapeHtml(currentSearch)}"
              placeholder="Search..."
              aria-label="Search products"
            />
          </label>
          <button type="submit" class="header-search__submit">Search</button>
        </form>
        <div class="header-actions">
          <button type="button" class="icon-button mobile-only" data-action="toggle-mobile-search" aria-label="Toggle search">
            ${icon(ui.mobileSearchOpen ? "x" : "search")}
          </button>
          <button
            type="button"
            class="icon-button ${state.theme === "dark" ? "is-active" : ""}"
            data-action="toggle-theme"
            aria-label="Toggle dark mode"
          >
            ${icon("moon")}
          </button>
          <a href="/wishlist" class="icon-button desktop-only ${routeName === "wishlist" ? "is-active" : ""}" aria-label="Wishlist">
            ${icon("heart")}
            ${wishlistCount > 0 ? `<span class="badge badge--danger">${wishlistCount > 99 ? "99+" : wishlistCount}</span>` : ""}
          </a>
          <a href="/cart" class="icon-button desktop-only ${routeName === "cart" ? "is-active" : ""}" aria-label="Cart">
            ${icon("bag")}
            ${cartCount > 0 ? `<span class="badge badge--primary">${cartCount > 99 ? "99+" : cartCount}</span>` : ""}
          </a>
          <a
            href="/profile"
            class="header-profile-button ${profileActive ? "is-active" : ""}"
            aria-label="Profile"
            title="Profile"
          >
            ${icon("user")}
          </a>
        </div>
      </div>
      <div class="container mobile-search ${ui.mobileSearchOpen ? "is-open" : ""}">
        <form class="header-search" data-form="header-search">
          <label class="header-search__field">
            ${icon("search", "icon search-icon")}
            <input
              type="search"
              name="search"
              value="${escapeHtml(currentSearch)}"
              placeholder="Search..."
              aria-label="Search products"
            />
          </label>
          <button type="submit" class="header-search__submit">Search</button>
        </form>
      </div>
    </header>
  `;
}

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand brand--footer">
            <span class="brand-mark">${icon("zap", "icon brand-icon")}</span>
            <span class="brand-word">Swift<span>Buy</span></span>
          </a>
          <p class="footer-copy">
            Shopping at the speed of life with curated discovery, fast checkout, and a polished mobile-first experience.
          </p>
          <div class="footer-points">
            <p>${icon("mapPin", "icon inline-icon")} 123 Commerce Street, Suite 100, New York, NY 10001</p>
            <p>${icon("phone", "icon inline-icon")} 1-800-SWIFTBUY</p>
            <p>${icon("mail", "icon inline-icon")} support@swiftbuy.com</p>
          </div>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul class="footer-links">
            <li><a href="/about">About us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/products">Shop all</a></li>
            <li><a href="/order-history">Track orders</a></li>
          </ul>
        </div>
        <div>
          <h3>Support</h3>
          <ul class="footer-links">
            <li><a href="/faq">Shipping information</a></li>
            <li><a href="/faq">Returns and exchanges</a></li>
            <li><a href="/faq">Privacy policy</a></li>
            <li><a href="/faq">Terms and conditions</a></li>
            <li><a href="/profile">My account</a></li>
          </ul>
        </div>
        <div>
          <h3>Stay in the loop</h3>
          <p class="footer-copy">
            Get new drops, flash deals, and product picks straight to your inbox.
          </p>
          ${renderNewsletterForm("footer")}
          <div class="social-strip">
            <span>Twitter</span>
            <span>Instagram</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${currentYear} SwiftBuy Inc. All rights reserved.</p>
        <div class="payment-strip">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>Apple Pay</span>
        </div>
      </div>
    </footer>
  `;
}

export function renderBottomNav(routeName) {
  const cartCount = getCartCount();
  const wishlistCount = state.wishlist.length;

  return `
    <nav class="bottom-nav" aria-label="Mobile">
      ${renderBottomNavLink("/", "Home", "home", routeName === "home")}
      ${renderBottomNavLink(
        "/products",
        "Browse",
        "search",
        routeName === "products" || routeName === "product",
      )}
      ${renderBottomNavLink("/cart", "Cart", "bag", routeName === "cart", cartCount)}
      ${renderBottomNavLink(
        "/wishlist",
        "Wishlist",
        "heart",
        routeName === "wishlist",
        wishlistCount,
      )}
      ${renderBottomNavLink(
        "/profile",
        "Profile",
        "user",
        routeName === "profile",
      )}
    </nav>
  `;
}

export function renderBottomNavLink(
  href,
  label,
  iconName,
  active,
  badge = 0,
) {
  return `
    <a href="${href}" class="bottom-nav__link ${active ? "is-active" : ""}">
      <span class="bottom-nav__icon">
        ${icon(iconName)}
        ${
          badge > 0
            ? `<span class="badge badge--${iconName === "heart" ? "danger" : "primary"}">${badge > 99 ? "99+" : badge}</span>`
            : ""
        }
      </span>
      <span>${label}</span>
    </a>
  `;
}

export function renderNavLink(href, label, active) {
  return `<a href="${href}" class="nav-link ${active ? "is-active" : ""}">${label}</a>`;
}

export function renderHeroCarousel() {
  return `
    <section class="hero" data-hero>
      ${heroSlides
        .map(
          (slide, index) => `
            <article class="hero-slide ${index === ui.heroIndex ? "is-active" : ""}" data-hero-slide="${index}">
              <img src="${slide.image}" alt="${escapeHtml(slide.title)}" />
              <div class="hero-slide__overlay hero-slide__overlay--${slide.accent}"></div>
              <div class="hero-slide__content">
                <p class="hero-eyebrow">${escapeHtml(slide.eyebrow)}</p>
                <h1>${escapeHtml(slide.title)}</h1>
                <p>${escapeHtml(slide.copy)}</p>
                <div class="hero-actions">
                  <a href="${slide.ctaPath}" class="button button--light">${escapeHtml(slide.cta)}</a>
                  <a href="${slide.secondaryPath}" class="button button--ghost-light">${escapeHtml(slide.secondaryCta)}</a>
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
      <button type="button" class="hero-arrow hero-arrow--prev" data-action="hero-prev" aria-label="Previous slide">
        ${icon("chevronLeft")}
      </button>
      <button type="button" class="hero-arrow hero-arrow--next" data-action="hero-next" aria-label="Next slide">
        ${icon("chevronRight")}
      </button>
      <div class="hero-dots">
        ${heroSlides
          .map(
            (_, index) => `
              <button
                type="button"
                class="hero-dot ${index === ui.heroIndex ? "is-active" : ""}"
                data-action="hero-dot"
                data-index="${index}"
                aria-label="Go to slide ${index + 1}"
              ></button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderSectionHeader(kicker, title, href, label) {
  return `
    <div class="section-heading">
      <div>
        <p class="section-kicker">${escapeHtml(kicker)}</p>
        <h2 class="section-title">${escapeHtml(title)}</h2>
      </div>
      <a href="${href}" class="section-link">${escapeHtml(label)} ${icon("arrowRight", "icon tiny-icon")}</a>
    </div>
  `;
}

export function renderStars(rating) {
  const fullStars = Math.round(rating);
  return `
    <span class="stars" aria-label="${rating} out of 5 stars">
      ${Array.from({ length: 5 }, (_, index) => `<span class="star ${index < fullStars ? "is-filled" : ""}">${icon("star", "icon star-icon")}</span>`).join("")}
    </span>
  `;
}

export function renderProductGrid(items, options = {}) {
  const view = options.view || "grid";
  return `
    <div class="product-grid ${view === "list" ? "product-grid--list" : ""}">
      ${items.map((product) => renderProductCard(product)).join("")}
    </div>
  `;
}

export function renderProductCard(product) {
  const inWishlist = state.wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return `
    <article class="product-card">
      <div class="product-card__media">
        <a href="/product/${product.id}" class="product-card__media-link">
          <img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="product-card__image product-card__image--primary" />
          <img src="${product.images[1] || product.images[0]}" alt="${escapeHtml(product.name)}" class="product-card__image product-card__image--secondary" />
        </a>
        <div class="product-card__badges">
          ${product.tags?.includes("new") ? '<span class="pill pill--success">New</span>' : ""}
          ${product.tags?.includes("bestseller") ? '<span class="pill pill--warning">Hot</span>' : ""}
          ${discount > 0 ? `<span class="pill pill--danger">-${discount}%</span>` : ""}
        </div>
        <button
          type="button"
          class="wishlist-button ${inWishlist ? "is-active" : ""}"
          data-action="toggle-wishlist"
          data-product-id="${product.id}"
          aria-label="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}"
        >
          ${icon("heart")}
        </button>
      </div>
      <div class="product-card__body">
        <p class="product-meta">${escapeHtml(product.category)} / ${escapeHtml(product.brand)}</p>
        <a href="/product/${product.id}" class="product-card__title">${escapeHtml(product.name)}</a>
        <div class="rating-row">
          ${renderStars(product.rating)}
          <span>${product.reviewCount.toLocaleString()} reviews</span>
        </div>
        <div class="price-row">
          <strong>${money(product.price)}</strong>
          ${product.originalPrice ? `<span>${money(product.originalPrice)}</span>` : ""}
        </div>
        <div class="product-card__actions">
          <a href="/product/${product.id}" class="button button--ghost">Details</a>
          <button
            type="button"
            class="button button--primary"
            data-action="add-to-cart"
            data-product-id="${product.id}"
          >
            ${icon("bag", "icon tiny-icon")} Add to cart
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderPagination(currentPage, totalPages) {
  if (totalPages <= 1) {
    return "";
  }

  const buttons = [];
  for (let page = 1; page <= totalPages; page += 1) {
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    ) {
      buttons.push(`
        <button
          type="button"
          class="${page === currentPage ? "is-active" : ""}"
          data-action="change-page"
          data-page="${page}"
        >
          ${page}
        </button>
      `);
    } else if (page === currentPage - 2 || page === currentPage + 2) {
      buttons.push('<span class="pagination-gap">...</span>');
    }
  }

  return `
    <nav class="pagination" aria-label="Pagination">
      <button type="button" data-action="change-page" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
      ${buttons.join("")}
      <button type="button" data-action="change-page" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
    </nav>
  `;
}

export function renderFilterForm({
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  minRating,
  brands,
}) {
  return `
    <form data-filter-form>
      <div class="filter-group">
        <h3>Categories</h3>
        ${categories
          .map(
            (category) => `
              <label class="check-row">
                <input type="checkbox" name="category" value="${category.slug}" ${selectedCategories.includes(category.slug) ? "checked" : ""} />
                <span>${escapeHtml(category.name)}</span>
              </label>
            `,
          )
          .join("")}
      </div>
      <div class="filter-group">
        <h3>Price range</h3>
        <div class="range-grid">
          <label>
            <span>Minimum</span>
            <input type="range" min="0" max="2000" step="10" name="minPrice" value="${minPrice}" />
            <strong data-price-label="min">${money(minPrice)}</strong>
          </label>
          <label>
            <span>Maximum</span>
            <input type="range" min="0" max="2000" step="10" name="maxPrice" value="${maxPrice}" />
            <strong data-price-label="max">${money(maxPrice)}</strong>
          </label>
        </div>
      </div>
      <div class="filter-group">
        <h3>Brands</h3>
        <div class="filter-scroll">
          ${brands
            .map(
              (brand) => `
                <label class="check-row">
                  <input type="checkbox" name="brand" value="${brand}" ${selectedBrands.includes(brand) ? "checked" : ""} />
                  <span>${escapeHtml(brand)}</span>
                </label>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="filter-group">
        <h3>Minimum rating</h3>
        ${[4, 3, 2, 1, 0]
          .map(
            (rating) => `
              <label class="check-row">
                <input type="radio" name="rating" value="${rating}" ${minRating === rating ? "checked" : ""} />
                <span>${rating === 0 ? "All ratings" : `${rating}+ stars`}</span>
              </label>
            `,
          )
          .join("")}
      </div>
    </form>
  `;
}

export function renderFilterPanel(filters) {
  return `
    <section class="filter-panel">
      <div class="filter-panel__header">
        <h2>${icon("filter", "icon tiny-icon")} Filters</h2>
        <button type="button" class="link-button" data-action="clear-filters">Clear all</button>
      </div>
      ${renderFilterForm(filters)}
    </section>
  `;
}

export function renderMobileFilterDrawer(filters) {
  return `
    <div class="drawer ${ui.mobileFilterOpen ? "is-open" : ""}">
      <div class="drawer__backdrop" data-action="close-filters"></div>
      <div class="drawer__panel">
        <div class="drawer__header">
          <h2>Filters</h2>
          <button type="button" class="icon-button" data-action="close-filters" aria-label="Close filters">
            ${icon("x")}
          </button>
        </div>
        ${renderFilterForm(filters)}
      </div>
    </div>
  `;
}

export function renderNewsletterForm(scope) {
  return `
    <form data-form="newsletter" data-scope="${scope}" class="newsletter-form">
      <input type="email" name="email" placeholder="your@email.com" required />
      <button type="submit" class="button button--primary">Subscribe</button>
    </form>
  `;
}

export function renderNewsletterPanel() {
  return `
    <div class="newsletter-panel">
      <div>
        <p class="section-kicker">${icon("mail", "icon tiny-icon")} Newsletter</p>
        <h2>Get early access to drops and deals</h2>
        <p>
          Sign up for weekly product edits, launch alerts, and thoughtful recommendations across the SwiftBuy catalog.
        </p>
      </div>
      ${renderNewsletterForm("home")}
    </div>
  `;
}

export function renderInputField(
  label,
  path,
  value,
  required,
  type = "text",
  spanTwo = false,
) {
  return `
    <label class="form-field ${spanTwo ? "form-field--wide" : ""}">
      <span>${label}${required ? " *" : ""}</span>
      <input
        type="${type}"
        value="${escapeHtml(value || "")}"
        ${required ? "required" : ""}
        data-checkout-field="${path}"
      />
    </label>
  `;
}

export function renderSuggestionBanner() {
  return `
    <section class="home-banner reveal">
      <div class="container home-banner__inner">
        <span class="banner-kicker">${icon("sparkles", "icon tiny-icon")} AI for you</span>
        <p>${escapeHtml(aiSuggestions[ui.heroIndex % aiSuggestions.length])}</p>
        <a href="/products">See all</a>
      </div>
    </section>
  `;
}

export function renderSortControl(selectedValue) {
  return `
    <label class="sort-control">
      <span>Sort by</span>
      <select data-role="sort-products">
        ${[
          ["featured", "Featured"],
          ["price-low", "Price: low to high"],
          ["price-high", "Price: high to low"],
          ["newest", "Newest"],
          ["popularity", "Most popular"],
          ["rating", "Highest rated"],
        ]
          .map(
            ([value, label]) =>
              `<option value="${value}" ${selectedValue === value ? "selected" : ""}>${label}</option>`,
          )
          .join("")}
      </select>
    </label>
  `;
}

export function getAvailableBrands() {
  return [...new Set(products.map((product) => product.brand))].sort();
}
