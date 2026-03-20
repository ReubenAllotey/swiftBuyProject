import { icon } from "../icons.js";
import { ui } from "../state.js";
import { getCartSubtotal, getDetailedCartItems } from "../store.js";
import { escapeHtml, money } from "../utils.js";
import { renderInputField } from "../components.js";

export function renderCheckoutPage() {
  const cartItems = getDetailedCartItems();
  if (!cartItems.length) {
    return `
      <section class="container section section--bottom">
        <div class="empty-state">
          <div class="empty-state__icon">${icon("creditCard")}</div>
          <h1>Your cart is empty</h1>
          <p>Add products before starting checkout.</p>
          <a href="/products" class="button button--primary">Go shopping</a>
        </div>
      </section>
    `;
  }

  const subtotal = getCartSubtotal();
  const shipping = 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return `
    <section class="container section section--tight">
      <div class="checkout-steps">
        ${renderCheckoutStep(1, "Shipping")}
        ${renderCheckoutStep(2, "Payment")}
        ${renderCheckoutStep(3, "Review")}
      </div>
      <div class="checkout-layout">
        <div class="checkout-main">
          ${
            ui.checkout.step === 1
              ? renderCheckoutShippingStep()
              : ui.checkout.step === 2
                ? renderCheckoutPaymentStep()
                : renderCheckoutReviewStep()
          }
        </div>
        <aside class="summary-card">
          <h2>Order summary</h2>
          <div class="summary-items">
            ${cartItems
              .map(
                (item) => `
                  <div class="summary-item">
                    <img src="${item.product.images[0]}" alt="${escapeHtml(item.product.name)}" />
                    <div>
                      <strong>${escapeHtml(item.product.name)}</strong>
                      <span>Qty ${item.quantity}</span>
                      <span>${money(item.lineTotal)}</span>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="summary-lines">
            <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
            <div><span>Shipping</span><strong>${money(shipping)}</strong></div>
            <div><span>Tax</span><strong>${money(tax)}</strong></div>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <strong>${money(total)}</strong>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderCheckoutStep(number, label) {
  const active = ui.checkout.step >= number;
  const complete = ui.checkout.step > number;
  return `
    <div class="checkout-step ${active ? "is-active" : ""}">
      <span class="checkout-step__number">${complete ? icon("check", "icon tiny-icon") : number}</span>
      <span>${label}</span>
    </div>
  `;
}

function renderCheckoutShippingStep() {
  const shipping = ui.checkout.shipping;
  return `
    <section class="panel-card">
      <div class="panel-card__header">
        ${icon("truck")}
        <div>
          <h2>Shipping information</h2>
          <p>Enter the delivery details for this order.</p>
        </div>
      </div>
      <form data-form="checkout-shipping" class="form-grid">
        ${renderInputField("Full name", "shipping.fullName", shipping.fullName, true)}
        ${renderInputField("Email", "shipping.email", shipping.email, true, "email")}
        ${renderInputField("Phone", "shipping.phone", shipping.phone, true, "tel")}
        ${renderInputField("Address line 1", "shipping.addressLine1", shipping.addressLine1, true, "text", true)}
        ${renderInputField("Address line 2", "shipping.addressLine2", shipping.addressLine2, false, "text", true)}
        ${renderInputField("City", "shipping.city", shipping.city, true)}
        ${renderInputField("State", "shipping.state", shipping.state, true)}
        ${renderInputField("ZIP code", "shipping.zipCode", shipping.zipCode, true)}
        ${renderInputField("Country", "shipping.country", shipping.country, true)}
        <button type="submit" class="button button--primary button--full">Continue to payment</button>
      </form>
    </section>
  `;
}

function renderCheckoutPaymentStep() {
  const card = ui.checkout.card;
  return `
    <section class="panel-card">
      <div class="panel-card__header">
        ${icon("creditCard")}
        <div>
          <h2>Payment method</h2>
          <p>Choose a method and complete the required billing details.</p>
        </div>
      </div>
      <form data-form="checkout-payment" class="form-grid">
        <label class="radio-card">
          <input type="radio" name="paymentMethod" value="card" ${ui.checkout.paymentMethod === "card" ? "checked" : ""} data-checkout-field="paymentMethod" />
          <span>${icon("creditCard", "icon tiny-icon")} Credit or debit card</span>
        </label>
        <label class="radio-card">
          <input type="radio" name="paymentMethod" value="paypal" ${ui.checkout.paymentMethod === "paypal" ? "checked" : ""} data-checkout-field="paymentMethod" />
          <span>PayPal</span>
        </label>
        ${
          ui.checkout.paymentMethod === "card"
            ? `
              ${renderInputField("Card number", "card.cardNumber", card.cardNumber, true, "text", true)}
              ${renderInputField("Cardholder name", "card.cardName", card.cardName, true)}
              ${renderInputField("Expiry date", "card.expiry", card.expiry, true)}
              ${renderInputField("CVV", "card.cvv", card.cvv, true)}
            `
            : ""
        }
        <div class="button-row button-row--split">
          <button type="button" class="button button--ghost" data-action="checkout-back">Back</button>
          <button type="submit" class="button button--primary">Review order</button>
        </div>
      </form>
    </section>
  `;
}

function renderCheckoutReviewStep() {
  const shipping = ui.checkout.shipping;
  return `
    <section class="panel-card">
      <div class="panel-card__header">
        ${icon("check")}
        <div>
          <h2>Review your order</h2>
          <p>Confirm the shipping details and payment method before placing the order.</p>
        </div>
      </div>
      <div class="review-grid">
        <section>
          <h3>Shipping address</h3>
          <p>${escapeHtml(shipping.fullName)}</p>
          <p>${escapeHtml(shipping.addressLine1)}</p>
          ${shipping.addressLine2 ? `<p>${escapeHtml(shipping.addressLine2)}</p>` : ""}
          <p>${escapeHtml(`${shipping.city}, ${shipping.state} ${shipping.zipCode}`)}</p>
          <p>${escapeHtml(shipping.country)}</p>
          <p>${escapeHtml(shipping.phone)}</p>
          <p>${escapeHtml(shipping.email)}</p>
        </section>
        <section>
          <h3>Payment</h3>
          <p>${ui.checkout.paymentMethod === "card" ? `Card ending in ${escapeHtml(ui.checkout.card.cardNumber.slice(-4) || "0000")}` : "PayPal"}</p>
        </section>
      </div>
      <div class="button-row button-row--split">
        <button type="button" class="button button--ghost" data-action="checkout-back">Back</button>
        <button type="button" class="button button--success" data-action="place-order">Place order</button>
      </div>
    </section>
  `;
}
