import {
  filterProducts,
  getRelatedProducts,
  productLookup,
  sortProducts,
} from "../catalog.js";
import { icon } from "../icons.js";
import { state } from "../state.js";
import { escapeHtml, money, slugifyCategory } from "../utils.js";
import {
  getAvailableBrands,
  renderFilterPanel,
  renderMobileFilterDrawer,
  renderPagination,
  renderProductGrid,
  renderSectionHeader,
  renderSortControl,
  renderStars,
} from "../components.js";
import { renderNotFoundPage } from "./static.js";

export function renderProductsPage() {
  const params = new URLSearchParams(window.location.search);
  const selectedCategories = getArrayParam(params, "category");
  const selectedBrands = getArrayParam(params, "brand");
  const searchTerm = params.get("search") || "";
  const sort = params.get("sort") || "featured";
  const minPrice = Number(params.get("minPrice") || 0);
  const maxPrice = Number(params.get("maxPrice") || 2000);
  const minRating = Number(params.get("rating") || 0);
  const page = Math.max(1, Number(params.get("page") || 1));
  const brands = getAvailableBrands();
  const filteredProducts = sortProducts(
    filterProducts({
      searchTerm,
      selectedCategories,
      selectedBrands,
      minPrice,
      maxPrice,
      minRating,
    }),
    sort,
  );
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const pageItems = filteredProducts.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);
  const title = searchTerm
    ? `Results for "${searchTerm}"`
    : selectedCategories.length === 1
      ? `${selectedCategories[0].replaceAll("-", " ")} products`
      : "All products";

  return `
    <section class="container section section--tight">
      <div class="page-header">
        <h1>${escapeHtml(title)}</h1>
        <p>${filteredProducts.length} products found</p>
      </div>
      <div class="catalog-layout">
        <aside class="filter-column desktop-only">
          ${renderFilterPanel({
            selectedCategories,
            selectedBrands,
            minPrice,
            maxPrice,
            minRating,
            brands,
          })}
        </aside>
        <div class="catalog-main">
          <div class="catalog-toolbar">
            <button type="button" class="button button--ghost mobile-only" data-action="open-filters">
              ${icon("filter", "icon tiny-icon")} Filters
            </button>
            ${renderSortControl(sort)}
            <div class="view-toggle desktop-only">
              <button type="button" class="${state.listingView === "grid" ? "is-active" : ""}" data-action="set-listing-view" data-view="grid" aria-label="Grid view">
                ${icon("grid")}
              </button>
              <button type="button" class="${state.listingView === "list" ? "is-active" : ""}" data-action="set-listing-view" data-view="list" aria-label="List view">
                ${icon("list")}
              </button>
            </div>
          </div>
          ${
            pageItems.length
              ? renderProductGrid(pageItems, { view: state.listingView })
              : `
                <div class="empty-state">
                  <h2>No products found</h2>
                  <p>Try updating your filters, search terms, or sorting options.</p>
                  <button type="button" class="button button--primary" data-action="clear-filters">Clear filters</button>
                </div>
              `
          }
          ${filteredProducts.length ? renderPagination(safePage, totalPages) : ""}
        </div>
      </div>
    </section>
    ${renderMobileFilterDrawer({
      selectedCategories,
      selectedBrands,
      minPrice,
      maxPrice,
      minRating,
      brands,
    })}
  `;
}

export function renderProductDetailPage(productId) {
  const product = productLookup.get(productId);
  if (!product) {
    return renderNotFoundPage();
  }

  return `
    <section class="container section section--tight">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/products">Products</a>
        <span>/</span>
        <a href="/products?category=${slugifyCategory(product.category)}">${escapeHtml(product.category)}</a>
        <span>/</span>
        <span>${escapeHtml(product.name)}</span>
      </nav>
      <div class="detail-layout" data-product-detail data-product-id="${product.id}">
        <input type="hidden" data-detail-field="selectedColor" value="" />
        <input type="hidden" data-detail-field="selectedSize" value="" />
        <input type="hidden" data-detail-field="quantity" value="1" />
        <div class="detail-gallery">
          <div class="detail-image-frame">
            <img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="detail-main-image" data-detail-main-image />
            ${
              product.originalPrice
                ? `<span class="detail-discount">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>`
                : ""
            }
          </div>
          <div class="thumbnail-grid">
            ${product.images
              .map(
                (image, index) => `
                  <button
                    type="button"
                    class="thumbnail-button ${index === 0 ? "is-active" : ""}"
                    data-action="select-detail-image"
                    data-image="${image}"
                  >
                    <img src="${image}" alt="${escapeHtml(product.name)} image ${index + 1}" />
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="detail-panel">
          <p class="section-kicker">${escapeHtml(product.brand)}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <div class="rating-row rating-row--large">
            ${renderStars(product.rating)}
            <span>${product.rating} / ${product.reviewCount.toLocaleString()} reviews</span>
          </div>
          <div class="detail-price">
            <strong>${money(product.price)}</strong>
            ${product.originalPrice ? `<span>${money(product.originalPrice)}</span>` : ""}
          </div>
          <p class="lead-copy">${escapeHtml(product.description)}</p>

          ${
            product.colors?.length
              ? renderVariantGroup("Color", "selectedColor", product.colors)
              : ""
          }
          ${
            product.sizes?.length
              ? renderVariantGroup("Size", "selectedSize", product.sizes)
              : ""
          }

          <div class="variant-group">
            <div class="variant-group__label">
              <span>Quantity</span>
              <strong data-detail-quantity-label>1</strong>
            </div>
            <div class="quantity-control">
              <button type="button" data-action="change-detail-quantity" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
              <span data-detail-quantity>1</span>
              <button type="button" data-action="change-detail-quantity" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
            </div>
          </div>

          <div class="detail-actions">
            <button type="button" class="button button--primary" data-action="detail-add-to-cart">
              ${icon("bag", "icon tiny-icon")} Add to cart
            </button>
            <button type="button" class="button button--success" data-action="detail-buy-now">Buy now</button>
            <button type="button" class="icon-button detail-heart ${state.wishlist.includes(product.id) ? "is-active" : ""}" data-action="toggle-wishlist" data-product-id="${product.id}" aria-label="Toggle wishlist">
              ${icon("heart")}
            </button>
          </div>

          <div class="trust-list">
            <p>${icon("truck", "icon inline-icon")} Free shipping on orders over $50</p>
            <p>${icon("shield", "icon inline-icon")} One-year warranty included</p>
            <p>${icon("rotate", "icon inline-icon")} 30-day hassle-free returns</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container section reveal">
      ${renderSectionHeader("Recommended", "You may also like", "/products", "Browse all")}
      ${renderProductGrid(getRelatedProducts(product.id, 4))}
    </section>
  `;
}

function renderVariantGroup(label, field, values) {
  return `
    <div class="variant-group">
      <div class="variant-group__label">
        <span>${label}</span>
        <strong data-detail-label="${field}">Select</strong>
      </div>
      <div class="variant-options">
        ${values
          .map(
            (value) => `
              <button
                type="button"
                class="variant-button"
                data-action="select-detail-variant"
                data-field="${field}"
                data-value="${value}"
              >
                ${escapeHtml(value)}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function getArrayParam(params, key) {
  const value = params.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}
