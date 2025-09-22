import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main teaser container with proper semantic structure
  const teaserContainer = document.createElement('section');
  teaserContainer.className = 'teaser-aldi-container';
  teaserContainer.setAttribute('aria-label', 'ALDI Gear promotional banner');
  
  // Create the content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'teaser-aldi-wrapper';
  
  // Create left section (text content) with proper semantic structure
  const leftSection = document.createElement('div');
  leftSection.className = 'teaser-aldi-content';
  leftSection.setAttribute('role', 'banner');
  
  // Create right section (product showcase) with proper semantic structure
  const rightSection = document.createElement('div');
  rightSection.className = 'teaser-aldi-showcase';
  rightSection.setAttribute('role', 'img');
  rightSection.setAttribute('aria-label', 'ALDI Gear product showcase');
  
  // Process the block content
  const rows = [...block.children];
  
  // First row: Text content (title, subtitle, CTA)
  if (rows[0]) {
    const textRow = rows[0];
    const textDivs = [...textRow.children];
    
    // Title (first div)
    if (textDivs[0]) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'teaser-aldi-title';
      moveInstrumentation(textDivs[0], titleDiv);
      while (textDivs[0].firstElementChild) {
        titleDiv.append(textDivs[0].firstElementChild);
      }
      leftSection.append(titleDiv);
    }
    
    // Subtitle (second div)
    if (textDivs[1]) {
      const subtitleDiv = document.createElement('div');
      subtitleDiv.className = 'teaser-aldi-subtitle';
      moveInstrumentation(textDivs[1], subtitleDiv);
      while (textDivs[1].firstElementChild) {
        subtitleDiv.append(textDivs[1].firstElementChild);
      }
      leftSection.append(subtitleDiv);
    }
    
    // CTA Button (third div)
    if (textDivs[2]) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'teaser-aldi-cta';
      moveInstrumentation(textDivs[2], ctaDiv);
      while (textDivs[2].firstElementChild) {
        ctaDiv.append(textDivs[2].firstElementChild);
      }
      
      // Enhance CTA accessibility
      const ctaLink = ctaDiv.querySelector('a');
      if (ctaLink) {
        ctaLink.setAttribute('aria-label', 'Shop ALDI Gear products');
        ctaLink.setAttribute('role', 'button');
        // Add keyboard navigation support
        ctaLink.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ctaLink.click();
          }
        });
      }
      
      leftSection.append(ctaDiv);
    }
  }
  
  // Remaining rows: Product images
  if (rows.length > 1) {
    const productGrid = document.createElement('div');
    productGrid.className = 'teaser-aldi-products';
    
    for (let i = 1; i < rows.length; i++) {
      const productRow = rows[i];
      const productDivs = [...productRow.children];
      
      productDivs.forEach((div, index) => {
        if (div.querySelector('picture')) {
          const productItem = document.createElement('div');
          productItem.className = `teaser-aldi-product teaser-aldi-product-${index + 1}`;
          
          // Optimize images and enhance accessibility
          const img = div.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(
              img.src, 
              img.alt || 'ALDI Gear product', 
              false, 
              [{ width: '400' }]
            );
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            
            // Add loading attribute for performance
            const optimizedImg = optimizedPic.querySelector('img');
            if (optimizedImg) {
              optimizedImg.setAttribute('loading', 'lazy');
              optimizedImg.setAttribute('decoding', 'async');
            }
            
            productItem.append(optimizedPic);
          } else {
            moveInstrumentation(div, productItem);
            while (div.firstElementChild) {
              productItem.append(div.firstElementChild);
            }
          }
          
          productGrid.append(productItem);
        }
      });
    }
    
    rightSection.append(productGrid);
  }
  
  // Assemble the structure
  contentWrapper.append(leftSection, rightSection);
  teaserContainer.append(contentWrapper);
  
  // Clear original content and add new structure
  block.textContent = '';
  block.append(teaserContainer);
  
  // Add diagonal separator element
  const separator = document.createElement('div');
  separator.className = 'teaser-aldi-separator';
  contentWrapper.append(separator);
}
