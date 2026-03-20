import { categories, homeBenefits, products, trustedBrands } from "../data.js";
import { getBestsellerProducts, getFeaturedProducts, getNewProducts } from "../catalog.js";
import { icon } from "../icons.js";
import { escapeHtml, money } from "../utils.js";
import {
  renderHeroCarousel,
  renderNewsletterPanel,
  renderProductGrid,
  renderSectionHeader,
} from "../components.js";

export function renderHomePage() {
  const featuredProducts = getFeaturedProducts(4);
  const bestsellerProducts = getBestsellerProducts(4);
  const newProducts = getNewProducts(4);
  const flashProducts = products.filter((product) => product.originalPrice).slice(0, 3);

  return `
    <section class="container section section--tight reveal">
      ${renderHeroCarousel()}
    </section>

    <section class="container section reveal">
      <div class="benefit-grid">
        ${homeBenefits
          .map(
            (item) => `
              <article class="benefit-card">
                <span class="benefit-card__icon">${icon(item.icon)}</span>
                <div>
                  <h3>${item.title}</h3>
                  <p>${item.detail}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="container section reveal">
      <div class="spotlight-panel">
        <div class="section-heading section-heading--spread">
          <div>
            <p class="section-kicker">${icon("zap", "icon tiny-icon")} Flash sale</p>
            <h2 class="section-title">Today's hottest deals</h2>
          </div>
          <div class="countdown">
            <span>Ends in</span>
            <div class="countdown__track">
              <strong data-countdown="hours">13</strong>
              <span>:</span>
              <strong data-countdown="minutes">00</strong>
              <span>:</span>
              <strong data-countdown="seconds">00</strong>
            </div>
          </div>
        </div>
        <div class="flash-grid">
          ${flashProducts
            .map(
              (product) => `
                <a href="/product/${product.id}" class="flash-card">
                  <img src="${product.images[0]}" alt="${escapeHtml(product.name)}" />
                  <div>
                    <p class="eyebrow">${product.brand}</p>
                    <h3>${escapeHtml(product.name)}</h3>
                    <div class="price-row">
                      <strong>${money(product.price)}</strong>
                      <span>${money(product.originalPrice)}</span>
                    </div>
                  </div>
                </a>
              `,
            )
            .join("")}
        </div>
        <div class="spotlight-panel__cta">
          <a href="/products" class="button button--primary">View all flash deals ${icon("arrowRight", "icon tiny-icon")}</a>
        </div>
      </div>
    </section>

    <section class="container section reveal">
      ${renderSectionHeader("Explore", "Shop by category", "/products", "All products")}
      <div class="category-grid">
        ${categories
          .map(
            (category) => `
              <a href="/products?category=${category.slug}" class="category-card">
                <img src="${category.image}" alt="${escapeHtml(category.name)}" />
                <span>${escapeHtml(category.name)}</span>
              </a>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="container section reveal">
      <div class="story-grid">
        <div class="story-media">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=900&fit=crop"
            alt="SwiftBuy storefront"
          />
          <div class="story-stats">
            <div><strong>2M+</strong><span>Happy shoppers</span></div>
            <div><strong>50K+</strong><span>Products</span></div>
            <div><strong>4.9</strong><span>App rating</span></div>
          </div>
        </div>
        <div class="story-copy">
          <p class="section-kicker">${icon("zap", "icon tiny-icon")} Our story</p>
          <h2 class="section-title">Shopping at the speed of life</h2>
          <p class="lead-copy">
            SwiftBuy blends curated discovery, premium design, and a fast mobile experience into one storefront you can browse from anywhere.
          </p>
          <ul class="feature-list">
            <li>${icon("sparkles", "icon tiny-icon")} AI-inspired product discovery</li>
            <li>${icon("zap", "icon tiny-icon")} Fast checkout in a few taps</li>
            <li>${icon("leaf", "icon tiny-icon")} Carbon-conscious shipping</li>
            <li>${icon("star", "icon tiny-icon")} Daily members-only offers</li>
          </ul>
          <a href="/about" class="button button--secondary">Our mission</a>
        </div>
      </div>
    </section>

    <section class="container section reveal">
      ${renderSectionHeader("Handpicked", "Featured products", "/products", "View all")}
      ${renderProductGrid(featuredProducts)}
    </section>

    <section class="container section reveal">
      <div class="promo-panel promo-panel--image">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=700&fit=crop"
          alt="Summer collection"
        />
        <div class="promo-panel__content">
          <span class="promo-chip">Limited time offer</span>
          <h2>Summer collection up to 70% off</h2>
          <p>Premium electronics, fashion, and statement essentials at standout prices.</p>
          <a href="/products?category=electronics" class="button button--light">Shop now</a>
        </div>
      </div>
    </section>

    <section class="container section reveal">
      ${renderSectionHeader("Trending now", "Bestsellers", "/products?sort=popularity", "See all")}
      ${renderProductGrid(bestsellerProducts)}
    </section>

    <section class="container section reveal">
      ${renderSectionHeader("Fresh drops", "New arrivals", "/products?sort=newest", "See all")}
      ${renderProductGrid(newProducts)}
    </section>

    <section class="container section reveal">
      ${renderNewsletterPanel()}
    </section>

    <section class="container section reveal">
      <p class="brands-label">Trusted brands</p>
      <div class="brand-strip">
        ${trustedBrands.map((brand) => `<span>${brand}</span>`).join("")}
      </div>
    </section>

    <section class="container section section--bottom reveal">
      <div class="eco-banner">
        <div class="eco-banner__icon">${icon("leaf")}</div>
        <div>
          <h3>SwiftBuy is carbon-neutral</h3>
          <p>Recyclable packaging, carbon-offset shipping, and a design system tuned for efficient browsing.</p>
        </div>
        <a href="/about">Learn more</a>
      </div>
    </section>
  `;
}
