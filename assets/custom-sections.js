/**
 * Custom Sections JavaScript
 * Handles popup functionality, cart operations, and enhanced user interactions
 */

class CustomSections {
  constructor() {
    this.productData = {};
    this.currentProduct = null;
    this.softWinterJacketVariantId = null; // This should be set to the actual variant ID
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupAccessibility();
    this.loadCartData();
  }

  bindEvents() {
    // Close popup events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup-overlay')) {
        this.closeProductPopup();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProductPopup();
      }
    });

    // Form submission
    const form = document.getElementById('popup-product-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddToCart();
      });
    }

    // Variant change events
    document.addEventListener('change', (e) => {
      if (e.target.matches('#popup-variants select')) {
        this.updateVariantPrice();
      }
    });
  }

  setupAccessibility() {
    // Add ARIA labels and roles
    const popup = document.getElementById('product-popup');
    if (popup) {
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-labelledby', 'popup-product-title');
    }

    // Add focus trap
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    const popup = document.getElementById('product-popup');
    if (!popup) return;

    const focusableElements = popup.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    popup.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  openProductPopup(productId, blockId) {
    const product = this.productData[productId];
    if (!product) {
      this.showMessage('Product not found', 'error');
      return;
    }

    this.currentProduct = product;
    this.populatePopupContent(product);
    this.showPopup();
  }

  populatePopupContent(product) {
    // Set image
    const image = document.getElementById('popup-product-image');
    if (image) {
      image.src = product.image || '';
      image.alt = product.title || '';
    }

    // Set title
    const title = document.getElementById('popup-product-title');
    if (title) {
      title.textContent = product.title || '';
    }

    // Set price
    this.updatePriceDisplay(product.price, product.compare_at_price);

    // Set description
    const description = document.getElementById('popup-product-description');
    if (description) {
      description.innerHTML = product.description || '';
    }

    // Generate variant options
    this.generateVariantOptions(product);
  }

  updatePriceDisplay(price, comparePrice) {
    const priceElement = document.getElementById('popup-product-price');
    if (!priceElement) return;

    if (comparePrice && comparePrice > price) {
      priceElement.innerHTML = `
        <span class="price-sale">${this.formatMoney(price)}</span>
        <span class="price-compare">${this.formatMoney(comparePrice)}</span>
      `;
    } else {
      priceElement.innerHTML = `<span class="price-regular">${this.formatMoney(price)}</span>`;
    }
  }

  generateVariantOptions(product) {
    const variantsContainer = document.getElementById('popup-variants');
    if (!variantsContainer) return;

    variantsContainer.innerHTML = '';

    if (!product.options || product.options.length === 0) return;

    product.options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'variant-option';

      const label = document.createElement('label');
      label.textContent = option.name + ':';
      label.setAttribute('for', `option-${option.name.toLowerCase()}`);

      const select = document.createElement('select');
      select.name = option.name.toLowerCase();
      select.id = `option-${option.name.toLowerCase()}`;
      select.setAttribute('data-option-name', option.name);

      option.values.forEach(value => {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.textContent = value;
        select.appendChild(optionElement);
      });

      optionDiv.appendChild(label);
      optionDiv.appendChild(select);
      variantsContainer.appendChild(optionDiv);
    });
  }

  updateVariantPrice() {
    if (!this.currentProduct) return;

    const selectedVariant = this.getSelectedVariant();
    if (selectedVariant) {
      this.updatePriceDisplay(selectedVariant.price, this.currentProduct.compare_at_price);
    }
  }

  getSelectedVariant() {
    if (!this.currentProduct) return null;

    const selectedOptions = {};
    const selects = document.querySelectorAll('#popup-variants select');

    selects.forEach(select => {
      selectedOptions[select.getAttribute('data-option-name')] = select.value;
    });

    return this.currentProduct.variants.find(variant => {
      return Object.keys(selectedOptions).every(optionName => {
        return variant.options[optionName] === selectedOptions[optionName];
      });
    });
  }

  showPopup() {
    const popup = document.getElementById('product-popup');
    if (popup) {
      popup.style.display = 'flex';
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Focus the close button for accessibility
      const closeButton = popup.querySelector('.popup-close');
      if (closeButton) {
        setTimeout(() => closeButton.focus(), 100);
      }
    }
  }

  closeProductPopup() {
    const popup = document.getElementById('product-popup');
    if (popup) {
      popup.style.display = 'none';
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
      this.currentProduct = null;
    }
  }

  async handleAddToCart() {
    if (!this.currentProduct) return;

    const selectedVariant = this.getSelectedVariant();
    if (!selectedVariant) {
      this.showMessage('Please select a variant', 'error');
      return;
    }

    if (!selectedVariant.available) {
      this.showMessage('This variant is out of stock', 'error');
      return;
    }

    const quantity = parseInt(document.getElementById('popup-quantity')?.value || 1);
    const button = document.querySelector('.popup-add-to-cart');
    
    // Show loading state
    if (button) {
      button.classList.add('loading');
      button.disabled = true;
    }

    try {
      await this.addToCart(selectedVariant, quantity);
      this.closeProductPopup();
      this.showMessage('Product added to cart!', 'success');
      this.updateCartCount();
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showMessage('Error adding product to cart. Please try again.', 'error');
    } finally {
      // Remove loading state
      if (button) {
        button.classList.remove('loading');
        button.disabled = false;
      }
    }
  }

  async addToCart(variant, quantity) {
    const items = [{
      id: variant.id,
      quantity: quantity
    }];

    // Check if we need to add the Soft Winter Jacket
    if (this.shouldAddBonusProduct(variant)) {
      if (this.softWinterJacketVariantId) {
        items.push({
          id: this.softWinterJacketVariantId,
          quantity: 1
        });
      }
    }

    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    return response.json();
  }

  shouldAddBonusProduct(variant) {
    // Check if the selected variant has Black color and Medium size
    return variant.options && 
           variant.options['Color'] === 'Black' && 
           variant.options['Size'] === 'Medium';
  }

  async loadCartData() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      this.updateCartDisplay(cart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // Update cart count in header if it exists
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        cartCount.textContent = cart.item_count;
      }
      
      // Trigger cart drawer refresh if it exists
      if (window.theme && window.theme.cartDrawer) {
        window.theme.cartDrawer.refresh();
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  updateCartDisplay(cart) {
    // Update any cart displays on the page
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = cart.item_count;
    }
  }

  showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    message.setAttribute('role', 'alert');
    
    document.body.appendChild(message);

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 3000);
  }

  formatMoney(cents) {
    if (typeof cents !== 'number') return '$0.00';
    return '$' + (cents / 100).toFixed(2);
  }

  // Method to set the Soft Winter Jacket variant ID
  setSoftWinterJacketVariantId(variantId) {
    this.softWinterJacketVariantId = variantId;
  }

  // Method to add product data
  addProductData(productId, data) {
    this.productData[productId] = data;
  }
}

// Global functions for backward compatibility
let customSections;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    customSections = new CustomSections();
  });
} else {
  customSections = new CustomSections();
}

// Global functions that can be called from Liquid templates
window.openProductPopup = function(productId, blockId) {
  if (customSections) {
    customSections.openProductPopup(productId, blockId);
  }
};

window.closeProductPopup = function() {
  if (customSections) {
    customSections.closeProductPopup();
  }
};

window.addProductData = function(productId, data) {
  if (customSections) {
    customSections.addProductData(productId, data);
  }
};

window.setSoftWinterJacketVariantId = function(variantId) {
  if (customSections) {
    customSections.setSoftWinterJacketVariantId(variantId);
  }
};

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements that should animate in
  document.querySelectorAll('.product-card, .banner-content').forEach(el => {
    observer.observe(el);
  });
}