import { productLookup } from "../catalog.js";
import { icon } from "../icons.js";
import { state, ui } from "../state.js";
import { getCartSubtotal, getDetailedCartItems } from "../store.js";
import { escapeHtml, formatDate, money } from "../utils.js";
import { renderProductGrid } from "../components.js";

export function renderCartPage() {
  const cartItems = getDetailedCartItems();

  if (!cartItems.length) {
    return `
      <section class="container section section--bottom">
        <div class="empty-state">
          <div class="empty-state__icon">${icon("bag")}</div>
          <h1>Your cart is empty</h1>
          <p>Looks like you have not added anything yet. Start exploring the catalog.</p>
          <a href="/products" class="button button--primary">Continue shopping</a>
        </div>
      </section>
    `;
  }

  const subtotal = getCartSubtotal();
  const discount = ui.promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  return `
    <section class="container section section--tight">
      <div class="page-header page-header--spread">
        <div>
          <h1>Shopping cart</h1>
          <p>${cartItems.length} line item${cartItems.length === 1 ? "" : "s"}</p>
        </div>
        <button type="button" class="link-button link-button--danger" data-action="clear-cart">Clear cart</button>
      </div>
      <div class="cart-layout">
        <div class="cart-items">
          ${cartItems
            .map(
              (item) => `
                <article class="cart-card">
                  <a href="/product/${item.product.id}" class="cart-card__media">
                    <img src="${item.product.images[0]}" alt="${escapeHtml(item.product.name)}" />
                  </a>
                  <div class="cart-card__body">
                    <div class="cart-card__head">
                      <div>
                        <a href="/product/${item.product.id}" class="cart-card__title">${escapeHtml(item.product.name)}</a>
                        <p class="product-meta">${escapeHtml(item.product.brand)}</p>
                      </div>
                      <button type="button" class="icon-button" data-action="remove-cart-item" data-cart-key="${encodeURIComponent(item.key)}" aria-label="Remove item">
                        ${icon("trash")}
                      </button>
                    </div>
                    <div class="cart-card__meta">
                      ${item.selectedColor ? `<span>Color: ${escapeHtml(item.selectedColor)}</span>` : ""}
                      ${item.selectedSize ? `<span>Size: ${escapeHtml(item.selectedSize)}</span>` : ""}
                    </div>
                    <div class="cart-card__foot">
                      <div class="quantity-control quantity-control--small">
                        <button type="button" data-action="change-cart-quantity" data-cart-key="${encodeURIComponent(item.key)}" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="change-cart-quantity" data-cart-key="${encodeURIComponent(item.key)}" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
                      </div>
                      <div class="price-block">
                        <strong>${money(item.lineTotal)}</strong>
                        <span>${money(item.product.price)} each</span>
                      </div>
                    </div>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
        <aside class="summary-card">
          <h2>Order summary</h2>
          <form class="promo-form" data-form="promo-code">
            <label>
              <span>Promo code</span>
              <div class="promo-form__row">
                <input type="text" name="promoCode" value="${escapeHtml(ui.promoCode)}" placeholder="Try SAVE10" />
                <button type="submit" class="button button--ghost">Apply</button>
              </div>
            </label>
          </form>
          <div class="summary-lines">
            <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
            ${discount ? `<div class="summary-lines__discount"><span>Discount</span><strong>-${money(discount)}</strong></div>` : ""}
            <div><span>Shipping</span><strong>${shipping === 0 ? "Free" : money(shipping)}</strong></div>
            <div><span>Tax</span><strong>${money(tax)}</strong></div>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <strong>${money(total)}</strong>
          </div>
          <button type="button" class="button button--primary button--full" data-action="go-checkout">
            Proceed to checkout
          </button>
          <a href="/products" class="summary-link">Continue shopping</a>
          ${subtotal < 50 ? `<p class="shipping-note">Add ${money(50 - subtotal)} more to unlock free shipping.</p>` : ""}
        </aside>
      </div>
    </section>
  `;
}

export function renderWishlistPage() {
  const items = state.wishlist.map((id) => productLookup.get(id)).filter(Boolean);

  if (!items.length) {
    return `
      <section class="container section section--bottom">
        <div class="empty-state">
          <div class="empty-state__icon">${icon("heart")}</div>
          <h1>Your wishlist is empty</h1>
          <p>Save products you love and come back to them later.</p>
          <a href="/products" class="button button--primary">Explore products</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="container section section--tight">
      <div class="page-header">
        <h1>My wishlist</h1>
        <p>${items.length} saved item${items.length === 1 ? "" : "s"}</p>
      </div>
      ${renderProductGrid(items)}
    </section>
  `;
}

export function renderOrderHistoryPage() {
  const orders = [...state.orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return `
    <section class="container section section--tight">
      <div class="page-header">
        <h1>Order history</h1>
        <p>${orders.length} order${orders.length === 1 ? "" : "s"} on file</p>
      </div>
      <div class="order-list">
        ${orders
          .map(
            (order) => `
              <article class="order-card">
                <div class="order-card__head">
                  <div>
                    <h2>Order #${order.id}</h2>
                    <p>Placed on ${formatDate(order.date)}</p>
                  </div>
                  <span class="status-pill status-pill--${order.status.toLowerCase()}">${order.status}</span>
                </div>
                <div class="order-card__foot">
                  <div>
                    <strong>${money(order.total)}</strong>
                    <p>${order.itemsCount || order.items?.length || 0} item${(order.itemsCount || order.items?.length || 0) === 1 ? "" : "s"}</p>
                  </div>
                  <button type="button" class="button button--ghost" data-action="view-order-details">View details</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}
