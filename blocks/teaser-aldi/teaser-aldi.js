export default function decorate(block) {
  // Add classes to all div elements for easier identification and styling
  const divs = block.querySelectorAll('div');
  
  divs.forEach((div, index) => {
    // Skip the wrapper div (first div)
    if (index === 0) return;
    
    // Add specific classes based on content and position
    switch (index) {
      case 1:
        // Title div - "Upcoming ALDI Finds"
        div.classList.add('teaser-aldi-title');
        break;
      case 2:
        // Subtitle div - "Grab your gear before it's gone."
        div.classList.add('teaser-aldi-subtitle');
        break;
      case 3:
        // CTA text div - "Shop Now"
        div.classList.add('teaser-aldi-cta-text');
        break;
      case 4:
        // Button container div
        div.classList.add('teaser-aldi-button-container');
        break;
      case 5:
        // Image container div
        div.classList.add('teaser-aldi-image-container');
        break;
      case 6:
        // Additional text div (teaser1) - hide this
        div.classList.add('teaser-aldi-additional-text');
        break;
      default:
        // Generic class for any additional divs
        div.classList.add('teaser-aldi-content');
    }
  });

  // Handle custom text class if provided
  const { textClass } = block.dataset;
  if (textClass) {
    const textDiv = block.querySelector('.teaser-aldi-subtitle');
    if (textDiv) {
      textDiv.classList.add(textClass);
    }
  }
}
