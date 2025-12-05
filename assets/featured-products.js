class FeaturedProducts extends HTMLElement {
  constructor() {
    super();

    this.sectionId = this.dataset.sectionId;
    this.sectionUrl = this.dataset.sectionUrl;

    // Catch clicks on Add to Cart buttons inside this section
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
      // Add product to cart using Shopify AJAX API
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });

      const data = await response.json();

      // Update the cart drawer (Dawn theme)
      const cartDrawer = document.querySelector("cart-drawer");
      if (cartDrawer && cartDrawer.renderContents) {
        cartDrawer.renderContents();
      }

      // Update cart counter bubble in the header
      this.updateCartBubble();

      // Update the Featured Products section
      this.updateSection();

    } catch (error) {
      console.error("Add to cart failed", error);
    }
  }

  async updateSection() {
    try {
      // Section Rendering API: fetch updated section HTML
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

  async updateCartBubble() {
    try {
      // Load updated header HTML
      const response = await fetch(`/cart?section_id=header`);
      const html = await response.text();

      const temp = document.createElement("div");
      temp.innerHTML = html;

      // New bubble element
      const newBubble = temp.querySelector('.cart-count-bubble');
      // Current bubble element
      const currentBubble = document.querySelector('.cart-count-bubble');

      // If the updated header does not contain a bubble (cart = 0) — remove it
      if (!newBubble) {
        if (currentBubble) currentBubble.remove();
        return;
      }

      // If bubble didn't exist before — insert new one
      if (!currentBubble) {
        const cartLink = document.querySelector('a[href="/cart"], a[href="/cart"]');
        if (cartLink) cartLink.appendChild(newBubble);
        return;
      }

      // Replace inner HTML of the existing bubble
      currentBubble.innerHTML = newBubble.innerHTML;

    } catch (error) {
      console.error("Cart bubble update failed", error);
    }
  }
}

// Register Web Component
customElements.define("featured-products", FeaturedProducts);
