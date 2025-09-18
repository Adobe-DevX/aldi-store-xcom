import ProductList from '@dropins/storefront-product-discovery/containers/ProductList.js';
import { render as provider } from '@dropins/storefront-product-discovery/render.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/search.js';
import '../../scripts/initializers/wishlist.js';

export default async function decorate(block) {
  const labels = await fetchPlaceholders();
  const config = readBlockConfig(block);

  // Create carousel structure
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-carousel">
      <div class="product-carousel__header">
        <h2 class="product-carousel__title">${config.title || 'Featured Products'}</h2>
        <a href="#" class="product-carousel__show-all">Show All ></a>
      </div>
      <div class="product-carousel__container">
        <button class="product-carousel__nav product-carousel__nav--prev" aria-label="Previous products">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <div class="product-carousel__wrapper"></div>
        <button class="product-carousel__nav product-carousel__nav--next" aria-label="Next products">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  `);

  const $wrapper = fragment.querySelector('.product-carousel__wrapper');
  const $prevBtn = fragment.querySelector('.product-carousel__nav--prev');
  const $nextBtn = fragment.querySelector('.product-carousel__nav--next');
  const $showAllLink = fragment.querySelector('.product-carousel__show-all');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Add category url path to block for enrichment
  if (config.urlpath) {
    block.dataset.category = config.urlpath;
    // Set the "Show All" link to the category page
    $showAllLink.href = rootLink(`/category/${config.urlpath}`);
  }

  const categoryPathConfig = config.urlpath ? { categoryPath: config.urlpath } : {};
  const maxProducts = config.maxproducts || 10;

  const getAddToCartButton = (product) => {
    if (product.typename === 'ComplexProductView') {
      const button = document.createElement('div');
      UI.render(Button, {
        children: 'Add',
        icon: Icon({ source: 'Cart' }),
        onClick: () => {
          window.location.href = rootLink(`/products/${product.urlKey}/${product.sku}`);
        },
        variant: 'primary',
      })(button);
      return button;
    }
    const button = document.createElement('div');
    UI.render(Button, {
      children: 'Add',
      icon: Icon({ source: 'Cart' }),
      onClick: () => cartApi.addProductsToCart([{ sku: product.sku, quantity: 1 }]),
      variant: 'primary',
    })(button);
    return button;
  };

  // Carousel state
  let currentIndex = 0;
  let itemsPerView = 4;
  let totalItems = 0;
  let maxIndex = 0;

  // Update items per view based on screen size - single row only
  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width < 480) {
      itemsPerView = 1;
    } else if (width < 768) {
      itemsPerView = 2;
    } else if (width < 1024) {
      itemsPerView = 3;
    } else {
      itemsPerView = 4;
    }
    updateCarousel();
  };

  // Update carousel position
  const updateCarousel = () => {
    const translateX = -currentIndex * (200 + 16); // 200px item width + 16px gap
    $wrapper.style.transform = `translateX(${translateX}px)`;
    
    // Update navigation buttons
    $prevBtn.disabled = currentIndex === 0;
    $nextBtn.disabled = currentIndex >= maxIndex;
  };


  // Navigation event listeners
  $prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - itemsPerView);
      updateCarousel();
    }
  });

  $nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
      updateCarousel();
    }
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  $wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  $wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  $wrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentIndex < maxIndex) {
        // Swipe left - next
        currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        currentIndex = Math.max(0, currentIndex - itemsPerView);
      }
      updateCarousel();
    }
  });

  // Keyboard navigation
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - itemsPerView);
      updateCarousel();
    } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
      currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
      updateCarousel();
    }
  });

  // Window resize listener
  window.addEventListener('resize', updateItemsPerView);

  // Initialize items per view
  updateItemsPerView();

  // Render product list
  try {
    await provider.render(ProductList, {
      routeProduct: (product) => rootLink(`/products/${product.urlKey}/${product.sku}`),
      ...categoryPathConfig,
      limit: maxProducts,
      // Disable sorting and filtering for carousel
      sort: [],
      filter: [],
        slots: {
        ProductActions: (ctx) => {
          const actionsWrapper = document.createElement('div');
          actionsWrapper.className = 'product-carousel__actions product-discovery-product-actions';
          
          // Add to Cart Button
          const addToCartBtn = getAddToCartButton(ctx.product);
          addToCartBtn.className = 'product-discovery-product-actions__add-to-cart';
          
          actionsWrapper.appendChild(addToCartBtn);
          ctx.replaceWith(actionsWrapper);
        },
        
        Thumbnail: (ctx) => {
          const { item, defaultImageProps } = ctx;
          const img = document.createElement('img');
          img.src = item.imageUrl || defaultImageProps.src;
          img.alt = item.name || 'Product image';
          img.loading = 'lazy';
          img.className = 'product-carousel__item-image';
          return img;
        },
        
        Title: (ctx) => {
          const title = document.createElement('div');
          title.className = 'product-carousel__item-title';
          title.textContent = ctx.item.name || '';
          return title;
        },
        
        Price: (ctx) => {
          const price = document.createElement('div');
          price.className = 'product-carousel__item-price';
          price.textContent = ctx.item.price?.formatted || '';
          return price;
        },
        
        Brand: (ctx) => {
          const brand = document.createElement('div');
          brand.className = 'product-carousel__item-brand';
          brand.textContent = ctx.item.brand || '';
          return brand;
        },
        
        Quantity: (ctx) => {
          const quantity = document.createElement('div');
          quantity.className = 'product-carousel__item-quantity';
          quantity.textContent = ctx.item.quantity || '';
          return quantity;
        },
      },
    })($wrapper);

    // Wait for products to load and update carousel state
    setTimeout(() => {
      const items = $wrapper.querySelectorAll('.product-carousel__item');
      totalItems = items.length;
      maxIndex = Math.max(0, totalItems - itemsPerView);
      
      // Hide any sorting controls that might have been rendered
      const sortControls = block.querySelectorAll('.sort-controls, .sort-dropdown, .sort-select, .sort-by, .product-list-sort, .search-sort, [class*="sort"], [class*="Sort"]');
      sortControls.forEach(control => {
        control.style.display = 'none';
      });
      
      // Update initial state
      updateCarousel();
    }, 100);
  } catch (error) {
    console.error('Error rendering product carousel:', error);
  }
}
