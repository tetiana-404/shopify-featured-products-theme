class FeaturedProducts extends HTMLElement {
  constructor() {
    super();

    this.sectionId = this.dataset.sectionId;
    this.sectionUrl = this.dataset.sectionUrl;

    // Ловимо кліки на кнопки Add to cart у секції
    this.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-to-cart]");
      if (!btn) return;

      e.preventDefault();
      const variantId = btn.dataset.id;
      this.addToCart(variantId);
    });
  }

  async addToCart(variantId) {
    try {
      // Додаємо товар у кошик через Shopify AJAX API
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });

      const data = await response.json();

      // Оновлюємо Drawer / попап кошика (Dawn)
      const cartDrawer = document.querySelector("cart-drawer");
      if (cartDrawer && cartDrawer.renderContents) {
        cartDrawer.renderContents();
      }

      // Оновлюємо секцію Featured Products
      this.updateSection();

    } catch (error) {
      console.error("Add to cart failed", error);
    }
  }

  async updateSection() {
    try {
      // Section Rendering API: запитуємо оновлений HTML секції
      const url = `${this.sectionUrl}?section_id=${this.sectionId}`;
      const response = await fetch(url);
      const html = await response.text();

      const temp = document.createElement("div");
      temp.innerHTML = html;

      const updatedSection = temp.querySelector(`[data-section-id="${this.sectionId}"]`);
      if (updatedSection) {
        this.replaceWith(updatedSection);
      }
    } catch (error) {
      console.error("Section update failed", error);
    }
  }
}

// Реєструємо Web Component
customElements.define("featured-products", FeaturedProducts);
