export default function decorate(block) {
  // Create footer container
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  // Create feedback button
  const feedbackButton = document.createElement('button');
  feedbackButton.className = 'footer-feedback-button';
  feedbackButton.textContent = 'Feedback';
  feedbackButton.addEventListener('click', () => {
    // Handle feedback button click
    console.log('Feedback button clicked');
  });
  
  // Create scroll to top button
  const scrollTopButton = document.createElement('button');
  scrollTopButton.className = 'footer-scroll-top';
  scrollTopButton.setAttribute('aria-label', 'Scroll to top');
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Create main footer container
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  
  // Process block content
  const rows = [...block.children];
  
  rows.forEach((row, index) => {
    const columns = [...row.children];
    
    columns.forEach((column, colIndex) => {
      const columnDiv = document.createElement('div');
      columnDiv.className = 'footer-column';
      
      // Check if this is a heading
      const firstElement = column.querySelector('h1, h2, h3, h4, h5, h6');
      if (firstElement) {
        const heading = document.createElement('h3');
        heading.textContent = firstElement.textContent;
        columnDiv.appendChild(heading);
        
        // Create links list
        const linksList = document.createElement('ul');
        linksList.className = 'footer-links';
        
        // Get all links in this column
        const links = column.querySelectorAll('a');
        links.forEach(link => {
          const listItem = document.createElement('li');
          const footerLink = document.createElement('a');
          footerLink.href = link.href;
          footerLink.textContent = link.textContent;
          listItem.appendChild(footerLink);
          linksList.appendChild(listItem);
        });
        
        columnDiv.appendChild(linksList);
        
        // Special handling for payment methods and social media
        if (heading.textContent.toLowerCase().includes('payment')) {
          const paymentMethods = document.createElement('div');
          paymentMethods.className = 'footer-payment-methods';
          
          // Add payment method logos
          const paymentTypes = ['VISA', 'Mastercard', 'DISCOVER', 'AMERICAN EXPRESS', 'SNAP', 'Apple Pay'];
          paymentTypes.forEach(type => {
            const paymentDiv = document.createElement('div');
            paymentDiv.className = `payment-method ${type.toLowerCase().replace(' ', '-')}`;
            paymentDiv.textContent = type;
            paymentMethods.appendChild(paymentDiv);
          });
          
          columnDiv.appendChild(paymentMethods);
        }
        
        if (heading.textContent.toLowerCase().includes('follow')) {
          const socialMedia = document.createElement('div');
          socialMedia.className = 'footer-social-media';
          
          // Add social media icons
          const socialPlatforms = [
            { name: 'Facebook', icon: 'f' },
            { name: 'X', icon: 'X' },
            { name: 'Instagram', icon: '📷' },
            { name: 'YouTube', icon: '▶' },
            { name: 'TikTok', icon: '♪' },
            { name: 'Pinterest', icon: 'P' }
          ];
          
          socialPlatforms.forEach(platform => {
            const socialLink = document.createElement('a');
            socialLink.className = 'social-icon';
            socialLink.href = '#';
            socialLink.setAttribute('aria-label', platform.name);
            socialLink.textContent = platform.icon;
            socialMedia.appendChild(socialLink);
          });
          
          columnDiv.appendChild(socialMedia);
        }
      }
      
      footerContainer.appendChild(columnDiv);
    });
  });
  
  // Create legal links section
  const legalSection = document.createElement('div');
  legalSection.className = 'footer-legal';
  
  const legalLinks = document.createElement('div');
  legalLinks.className = 'footer-legal-links';
  
  const legalLinkTexts = [
    'Cookie Preferences',
    'Online Privacy Notice',
    'Terms of Use',
    'Security Policy',
    'Your Privacy Choices',
    'CA Supply Chains Act',
    'CA Cookware Disclosure',
    'CA Cleaning Disclosure',
    'ALDI International'
  ];
  
  legalLinkTexts.forEach(text => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = text;
    legalLinks.appendChild(link);
  });
  
  const sitemap = document.createElement('div');
  sitemap.className = 'footer-sitemap';
  sitemap.textContent = 'Sitemap';
  
  legalSection.appendChild(legalLinks);
  legalSection.appendChild(sitemap);
  
  // Assemble footer
  footer.appendChild(feedbackButton);
  footer.appendChild(footerContainer);
  footer.appendChild(legalSection);
  footer.appendChild(scrollTopButton);
  
  // Replace block content
  block.innerHTML = '';
  block.appendChild(footer);
  
  // Add scroll to top functionality
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopButton.style.display = 'flex';
    } else {
      scrollTopButton.style.display = 'none';
    }
  });
  
  // Initially hide scroll to top button
  scrollTopButton.style.display = 'none';
}