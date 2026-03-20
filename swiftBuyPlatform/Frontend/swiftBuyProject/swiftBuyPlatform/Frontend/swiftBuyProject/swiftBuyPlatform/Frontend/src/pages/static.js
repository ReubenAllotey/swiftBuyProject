import { categories, contactCards, faqItems } from "../data.js";
import { icon } from "../icons.js";
import { state, ui } from "../state.js";
import { escapeHtml, money } from "../utils.js";

export function renderLoginPage() {
  if (state.user) {
    return renderAlreadySignedIn(
      "You are already signed in.",
      "/profile",
      "Go to account",
    );
  }

  return `
    <section class="container section section--bottom">
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-head">
            <span class="brand-mark brand-mark--large">${icon("zap", "icon brand-icon")}</span>
            <h1>Welcome back</h1>
            <p>Sign in to your SwiftBuy account.</p>
          </div>
          <form data-form="login" class="form-stack">
            <label class="form-field">
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>
            <label class="form-field">
              <span>Password</span>
              <div class="password-field">
                <input id="login-password" type="password" name="password" required placeholder="Enter password" />
                <button type="button" class="ghost-button" data-action="toggle-password" data-target="login-password">Show</button>
              </div>
            </label>
            <button type="submit" class="button button--primary button--full">Sign in</button>
          </form>
          <p class="auth-switch">New to SwiftBuy? <a href="/register">Create an account</a></p>
        </div>
      </div>
    </section>
  `;
}

export function renderRegisterPage() {
  if (state.user) {
    return renderAlreadySignedIn(
      "You already have an active session.",
      "/profile",
      "Go to account",
    );
  }

  return `
    <section class="container section section--bottom">
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-head">
            <h1>Create account</h1>
            <p>Join SwiftBuy and keep your cart, wishlist, and orders in one place.</p>
          </div>
          <form data-form="register" class="form-stack">
            <label class="form-field">
              <span>Full name</span>
              <input type="text" name="name" required placeholder="John Doe" />
            </label>
            <label class="form-field">
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>
            <label class="form-field">
              <span>Password</span>
              <div class="password-field">
                <input id="register-password" type="password" name="password" required placeholder="Create password" />
                <button type="button" class="ghost-button" data-action="toggle-password" data-target="register-password">Show</button>
              </div>
            </label>
            <label class="form-field">
              <span>Confirm password</span>
              <input type="password" name="confirmPassword" required placeholder="Confirm password" />
            </label>
            <button type="submit" class="button button--primary button--full">Create account</button>
          </form>
          <p class="auth-switch">Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </section>
  `;
}

export function renderProfilePage() {
  const profileUser = state.user || {
    name: "SwiftBuy Member",
    username: "swiftbuy.member",
    email: "member@swiftbuy.demo",
    phone: "Phone not added yet",
  };
  const username = getProfileUsername(profileUser);
  const phone = profileUser.phone || "Phone not added yet";
  const initials = getProfileInitials(profileUser.name || profileUser.email || "SB");
  const pendingOrders = state.orders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Cancelled",
  ).length;
  const deliveredOrders = state.orders.filter(
    (order) => order.status === "Delivered",
  ).length;
  const cancelledOrders = state.orders.filter(
    (order) => order.status === "Cancelled",
  ).length;
  const sellerProfile =
    state.user && state.seller.ownerEmail === state.user.email
      ? state.seller
      : { ownerEmail: "", products: [], ordersReceived: 0, earnings: 0 };
  const hasSellerProfile = sellerProfile.products.length > 0;

  const buyerTiles = [
    {
      href: "/order-history",
      iconName: "package",
      title: "My Orders",
      meta: `${state.orders.length} tracked`,
      description: "Review deliveries, updates, and previous purchases.",
    },
    {
      href: "/wishlist",
      iconName: "heart",
      title: "Wishlist",
      meta: `${state.wishlist.length} saved`,
      description: "Keep favorite products close and move them into the cart fast.",
    },
    {
      action: "show-toast",
      message: "Your product reviews will appear here after your next rating.",
      iconName: "star",
      title: "Reviews",
      meta: "Feedback hub",
      description: "See your ratings, comments, and review history in one place.",
    },
    {
      action: "show-toast",
      message: "Recently viewed products will appear here soon.",
      iconName: "clock",
      title: "Recently Viewed",
      meta: "Pick up where you left off",
      description: "Jump back into products you explored across the catalog.",
    },
  ];

  const sellerTiles = [
    {
      action: "show-toast",
      message: "Your product management tools will expand here next.",
      iconName: "bag",
      title: "My Products",
      meta: `${sellerProfile.products.length} listed`,
      description: "Review what is live now and what still needs attention.",
    },
    {
      action: "show-toast",
      message: "Orders received will appear here as soon as customers start buying.",
      iconName: "truck",
      title: "Orders Received",
      meta: `${sellerProfile.ordersReceived} received`,
      description: "Track incoming orders and fulfillment progress from one place.",
    },
    {
      action: "show-toast",
      message: "Earnings reporting will appear here once you make your first sale.",
      iconName: "creditCard",
      title: "Earnings",
      meta: money(sellerProfile.earnings),
      description: "Follow your revenue, payouts, and overall store performance.",
    },
    {
      href: "/add-product",
      iconName: "plus",
      title: "Manage Store",
      meta: "Add another listing",
      description: "Keep growing your catalog with fresh products and inventory updates.",
    },
  ];

  return `
    <section class="container section section--tight section--bottom">
      <div class="profile-shell">
        <div class="profile-card profile-card--identity">
          <div class="profile-identity">
            <div class="profile-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
            <div class="profile-identity__copy">
              <p class="section-kicker">My account</p>
              <h1>${escapeHtml(profileUser.name)}</h1>
              <p class="profile-identity__username">@${escapeHtml(username)}</p>
              <div class="profile-contact-list">
                <span>${escapeHtml(profileUser.email)}</span>
                <span>${escapeHtml(phone)}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="button button--ghost"
            data-action="show-toast"
            data-message="${escapeHtml(state.user ? "Profile editing is coming soon." : "Sign in to personalize this profile.")}"
          >
            Edit Profile
          </button>
        </div>

        <section class="profile-section">
          <div class="profile-section__head">
            <div>
              <h2>Buyer essentials</h2>
              <p>The shopping tools every SwiftBuy customer sees by default.</p>
            </div>
          </div>
          <div class="profile-tile-grid">
            ${buyerTiles.map((tile) => renderProfileTile(tile)).join("")}
          </div>
        </section>

        ${
          hasSellerProfile
            ? `
              <section class="profile-section">
                <div class="profile-section__head">
                  <div>
                    <h2>Seller dashboard</h2>
                    <p>Your seller tools appear here after your first listing goes live.</p>
                  </div>
                </div>
                <div class="profile-tile-grid">
                  ${sellerTiles.map((tile) => renderProfileTile(tile)).join("")}
                </div>
              </section>
            `
            : `
              <section class="profile-sell-card">
                <div>
                  <p class="section-kicker">Start selling</p>
                  <h2>List your product and earn money</h2>
                  <p>Publish your first listing to unlock products, seller orders, and earnings inside your profile.</p>
                </div>
                <div class="profile-sell-card__actions">
                  <a href="/add-product" class="button button--light">Sell a Product</a>
                  <span>Create product / Upload images / Publish</span>
                </div>
              </section>
            `
        }

        <section class="profile-section">
          <div class="profile-section__head">
            <div>
              <h2>Orders shortcut</h2>
              <p>Quick status snapshots so you can scan your recent activity fast.</p>
            </div>
          </div>
          <div class="profile-status-grid">
            <article class="profile-status-card">
              <span class="profile-status-card__icon">${icon("clock")}</span>
              <strong>${pendingOrders}</strong>
              <span>Pending Orders</span>
            </article>
            <article class="profile-status-card">
              <span class="profile-status-card__icon">${icon("check")}</span>
              <strong>${deliveredOrders}</strong>
              <span>Delivered</span>
            </article>
            <article class="profile-status-card">
              <span class="profile-status-card__icon">${icon("x")}</span>
              <strong>${cancelledOrders}</strong>
              <span>Cancelled</span>
            </article>
          </div>
        </section>

        <section class="profile-section">
          <div class="profile-section__head">
            <div>
              <h2>Account tools</h2>
              <p>Manage the details that support checkout, notifications, and your everyday account setup.</p>
            </div>
          </div>
          <div class="profile-tile-grid profile-tile-grid--three">
            ${renderProfileTile({
              action: "show-toast",
              message: "Address management is coming soon.",
              iconName: "mapPin",
              title: "Addresses",
              meta: "Saved locations",
              description: "Add delivery addresses and choose where orders should arrive.",
            })}
            ${renderProfileTile({
              action: "show-toast",
              message: "Payment method management is coming soon.",
              iconName: "creditCard",
              title: "Payment Methods",
              meta: "Cards and mobile money",
              description: "Manage the ways you pay across checkout and repeat purchases.",
            })}
            ${renderProfileTile({
              action: "show-toast",
              message: "Settings will be expanded soon.",
              iconName: "user",
              title: "Settings",
              meta: "Account and notifications",
              description: "Update preferences, privacy controls, and password-related settings.",
            })}
          </div>
        </section>

        <section class="profile-section">
          <div class="profile-section__head">
            <div>
              <h2>Security</h2>
              <p>Extra account protection and visibility into where your account has been used.</p>
            </div>
          </div>
          <div class="profile-tile-grid profile-tile-grid--two">
            ${renderProfileTile({
              action: "show-toast",
              message: "Two-factor authentication setup is coming soon.",
              iconName: "shield",
              title: "Two-Factor Authentication",
              meta: "Extra protection",
              description: "Add another layer of security before anyone can sign in.",
            })}
            ${renderProfileTile({
              action: "show-toast",
              message: "Login activity details are coming soon.",
              iconName: "clock",
              title: "Login Activity",
              meta: "Recent sessions",
              description: "Review recent account access and spot anything unusual quickly.",
            })}
          </div>
        </section>

        <section class="profile-section">
          <div class="profile-section__head">
            <div>
              <h2>Support</h2>
              <p>Get help fast or sign out when you are finished.</p>
            </div>
          </div>
          <div class="profile-tile-grid profile-tile-grid--two">
            ${renderProfileTile({
              href: "/faq",
              iconName: "mail",
              title: "Help Center",
              meta: "FAQs and support",
              description: "Find answers to delivery, returns, payments, and account questions.",
            })}
            ${renderProfileTile({
              action: "logout",
              iconName: "x",
              title: "Logout",
              meta: "End this session",
              description: "Sign out of SwiftBuy on this device when you are done.",
              tone: "danger",
            })}
          </div>
        </section>
      </div>
    </section>
  `;
}

export function renderAddProductPage() {
  return `
    <section class="container section section--bottom">
      <div class="page-hero">
        <p class="section-kicker">Seller tools</p>
        <h1>Add a product</h1>
        <p>
          Create a clean product listing with the details shoppers need most. This demo page is ready for a backend when you are.
        </p>
      </div>
      <div class="listing-layout">
        <div class="panel-card listing-card">
          <div class="panel-card__header">
            <div>
              <h2>Product details</h2>
              <p>Keep the title clear, add a strong image, and use a short description that highlights the value fast.</p>
            </div>
            <div class="listing-badge">
              ${icon("package")}
              <span>New listing</span>
            </div>
          </div>
          <form data-form="add-product" class="form-grid listing-form">
            <label class="form-field form-field--wide">
              <span>Product name</span>
              <input type="text" name="name" required placeholder="Noise cancelling headphones" />
            </label>
            <label class="form-field">
              <span>Price</span>
              <input type="number" name="price" min="0.01" step="0.01" required placeholder="199.99" />
            </label>
            <label class="form-field">
              <span>Original price</span>
              <input type="number" name="originalPrice" min="0.01" step="0.01" placeholder="249.99" />
            </label>
            <label class="form-field">
              <span>Category</span>
              <select name="category" required>
                <option value="">Select a category</option>
                ${categories
                  .map(
                    (category) =>
                      `<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            <label class="form-field">
              <span>Brand</span>
              <input type="text" name="brand" required placeholder="SwiftAudio" />
            </label>
            <label class="form-field">
              <span>Inventory status</span>
              <select name="inventoryStatus">
                <option value="In stock">In stock</option>
                <option value="Low stock">Low stock</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </label>
            <label class="form-field">
              <span>Image URL</span>
              <input type="url" name="imageUrl" placeholder="https://images.unsplash.com/..." />
            </label>
            <label class="form-field form-field--wide">
              <span>Short description</span>
              <textarea
                name="description"
                rows="6"
                required
                placeholder="Describe the fit, features, materials, and the reason customers will want this item."
              ></textarea>
            </label>
            <div class="button-row">
              <button type="submit" class="button button--primary">Publish product</button>
              <a href="/products" class="button button--ghost">Browse catalog</a>
            </div>
          </form>
        </div>
        <aside class="listing-sidebar">
          <div class="promo-panel promo-panel--solid listing-panel">
            <span class="promo-chip">Pro tip</span>
            <h2>Lead with the strongest value</h2>
            <p>
              Product titles that name the item, brand, and standout feature usually scan best in fast storefront layouts.
            </p>
          </div>
          <div class="panel-card listing-panel">
            <div class="panel-card__header">
              ${icon("sparkles")}
              <div>
                <h2>Before you publish</h2>
                <p>Use this quick checklist to keep the page polished.</p>
              </div>
            </div>
            <div class="listing-checklist">
              <div class="listing-checklist__item">
                ${icon("check", "icon tiny-icon")}
                <span>Use a product name that is short and specific.</span>
              </div>
              <div class="listing-checklist__item">
                ${icon("check", "icon tiny-icon")}
                <span>Set a price that matches the brand positioning.</span>
              </div>
              <div class="listing-checklist__item">
                ${icon("check", "icon tiny-icon")}
                <span>Add an image that feels crisp and centered.</span>
              </div>
              <div class="listing-checklist__item">
                ${icon("check", "icon tiny-icon")}
                <span>Write a description that answers the first buyer questions.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
}

export function renderAboutPage() {
  return `
    <section class="container section section--tight">
      <div class="page-hero page-hero--center">
        <p class="section-kicker">About SwiftBuy</p>
        <h1>Built for modern shopping routines</h1>
        <p>
          SwiftBuy rethinks online retail with a fast interface, curated discovery, and a premium look that still feels practical on any screen.
        </p>
      </div>
      <div class="story-grid">
        <div class="story-copy">
          <h2 class="section-title">Our story</h2>
          <p class="lead-copy">
            We started with a simple idea: online shopping should feel more focused, less noisy, and faster to move through from inspiration to checkout.
          </p>
          <p>
            Today the storefront brings together trusted brands, thoughtful filters, and persistent cart and wishlist tools that make repeat browsing easier.
          </p>
        </div>
        <div class="story-media">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=900&fit=crop" alt="SwiftBuy team" />
        </div>
      </div>
      <div class="stat-grid">
        <article class="stat-card"><strong>10M+</strong><span>Products browsed monthly</span></article>
        <article class="stat-card"><strong>5M+</strong><span>Customers served globally</span></article>
        <article class="stat-card"><strong>99%</strong><span>Customer satisfaction score</span></article>
        <article class="stat-card"><strong>24/7</strong><span>Support coverage</span></article>
      </div>
      <div class="promo-panel promo-panel--solid">
        <h2>Join the team</h2>
        <p>We are always looking for thoughtful builders, designers, and operators to shape the next version of SwiftBuy.</p>
        <a href="/contact" class="button button--light">Get in touch</a>
      </div>
    </section>
  `;
}

export function renderContactPage() {
  return `
    <section class="container section section--tight">
      <div class="page-hero page-hero--center">
        <p class="section-kicker">Contact</p>
        <h1>We would love to hear from you</h1>
        <p>Reach out for product questions, partnerships, support, or feedback about the storefront experience.</p>
      </div>
      <div class="contact-grid">
        ${contactCards
          .map(
            (card) => `
              <article class="info-card">
                ${icon(card.icon)}
                <h2>${card.title}</h2>
                <strong>${escapeHtml(card.info)}</strong>
                <p>${escapeHtml(card.detail)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="panel-card panel-card--narrow">
        <div class="panel-card__header">
          ${icon("send")}
          <div>
            <h2>Send a message</h2>
            <p>We will get back to you as soon as we can.</p>
          </div>
        </div>
        <form data-form="contact" class="form-grid">
          <label class="form-field">
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <label class="form-field">
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label class="form-field form-field--wide">
            <span>Subject</span>
            <input type="text" name="subject" required />
          </label>
          <label class="form-field form-field--wide">
            <span>Message</span>
            <textarea name="message" rows="6" required></textarea>
          </label>
          <button type="submit" class="button button--primary button--full">Send message</button>
        </form>
      </div>
    </section>
  `;
}

export function renderFaqPage() {
  return `
    <section class="container section section--tight">
      <div class="page-hero page-hero--center">
        <p class="section-kicker">FAQ</p>
        <h1>Frequently asked questions</h1>
        <p>Answers to common questions about checkout, delivery, returns, and managing your account.</p>
      </div>
      <div class="faq-list">
        ${faqItems
          .map(
            (faq) => `
              <details class="faq-item">
                <summary>
                  <span>${escapeHtml(faq.question)}</span>
                  ${icon("chevronDown", "icon tiny-icon")}
                </summary>
                <p>${escapeHtml(faq.answer)}</p>
              </details>
            `,
          )
          .join("")}
      </div>
      <div class="promo-panel promo-panel--subtle">
        <h2>Still need help?</h2>
        <p>Our support team can help with shipping questions, checkout problems, or account help.</p>
        <a href="/contact" class="button button--primary">Contact support</a>
      </div>
    </section>
  `;
}

export function renderOrderConfirmationPage() {
  const order = state.orders.find((item) => item.id === ui.lastOrderId) || state.orders[0];

  return `
    <section class="container section section--bottom">
      <div class="confirmation-card">
        <div class="confirmation-icon">${icon("check")}</div>
        <p class="section-kicker">Order confirmed</p>
        <h1>Thank you for your purchase</h1>
        <p>Order #${order ? order.id : "000000"} has been placed successfully.</p>
        <div class="confirmation-steps">
          <div><strong>1</strong><span>Confirmation email on the way</span></div>
          <div><strong>2</strong><span>Our team is preparing your items</span></div>
          <div><strong>3</strong><span>Tracking updates will appear in order history</span></div>
        </div>
        <div class="button-row">
          <a href="/order-history" class="button button--primary">View orders</a>
          <a href="/" class="button button--ghost">Continue shopping</a>
        </div>
      </div>
    </section>
  `;
}

export function renderNotFoundPage() {
  return `
    <section class="container section section--bottom">
      <div class="empty-state">
        <div class="empty-state__icon">${icon("zap")}</div>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or may have moved.</p>
        <div class="button-row">
          <a href="/" class="button button--primary">Back to home</a>
          <button type="button" class="button button--ghost" data-action="go-back">Go back</button>
        </div>
      </div>
    </section>
  `;
}

function renderAlreadySignedIn(message, href, cta) {
  return `
    <section class="container section section--bottom">
      <div class="empty-state">
        <div class="empty-state__icon">${icon("user")}</div>
        <h1>Account active</h1>
        <p>${message}</p>
        <a href="${href}" class="button button--primary">${cta}</a>
      </div>
    </section>
  `;
}

function renderProfileTile({
  href,
  action,
  message = "",
  iconName,
  title,
  meta,
  description,
  tone = "default",
}) {
  const content = `
    <span class="profile-tile__icon">${icon(iconName)}</span>
    <div class="profile-tile__body">
      <h3>${escapeHtml(title)}</h3>
      <strong>${escapeHtml(meta)}</strong>
      <p>${escapeHtml(description)}</p>
    </div>
  `;

  if (href) {
    return `
      <a href="${href}" class="profile-tile ${tone === "danger" ? "profile-tile--danger" : ""}">
        ${content}
      </a>
    `;
  }

  return `
    <button
      type="button"
      class="profile-tile ${tone === "danger" ? "profile-tile--danger" : ""}"
      ${action ? `data-action="${action}"` : ""}
      ${message ? `data-message="${escapeHtml(message)}"` : ""}
    >
      ${content}
    </button>
  `;
}

function getProfileInitials(name) {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!words.length) {
    return "SB";
  }

  return words.map((word) => word.charAt(0).toUpperCase()).join("");
}

function getProfileUsername(user) {
  if (user.username) {
    return user.username.replace(/^@+/, "");
  }

  if (user.email) {
    return user.email.split("@")[0].toLowerCase();
  }

  return String(user.name || "swiftbuy")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".");
}
