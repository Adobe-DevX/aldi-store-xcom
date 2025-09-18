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
    // TODO: Implement feedback functionality
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

  // Create the three main columns
  const aboutUsColumn = createAboutUsColumn();
  const helpColumn = createHelpColumn();
  const paymentSocialColumn = createPaymentSocialColumn();

  footerContainer.appendChild(aboutUsColumn);
  footerContainer.appendChild(helpColumn);
  footerContainer.appendChild(paymentSocialColumn);

  // Create legal links section
  const legalSection = createLegalSection();

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

// Helper function to create About Us column
function createAboutUsColumn() {
  const column = document.createElement('div');
  column.className = 'footer-column';

  const heading = document.createElement('h3');
  heading.textContent = 'About Us';
  column.appendChild(heading);

  const linksList = document.createElement('ul');
  linksList.className = 'footer-links';

  const aboutUsLinks = [
    'About ALDI',
    'Email Sign Up',
    'Mobile App',
    'Grand Openings',
    'Careers',
    'ALDI Corporate',
  ];

  aboutUsLinks.forEach((linkText) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = linkText;
    listItem.appendChild(link);
    linksList.appendChild(listItem);
  });

  column.appendChild(linksList);
  return column;
}

// Helper function to create Help column
function createHelpColumn() {
  const column = document.createElement('div');
  column.className = 'footer-column';

  const heading = document.createElement('h3');
  heading.textContent = 'Help';
  column.appendChild(heading);

  const linksList = document.createElement('ul');
  linksList.className = 'footer-links';

  const helpLinks = [
    'Help Center',
    'FAQs',
    'Gift Cards',
    'Return Policy',
    'Warranties & Manuals',
    'Product Recalls',
  ];

  helpLinks.forEach((linkText) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = linkText;
    listItem.appendChild(link);
    linksList.appendChild(listItem);
  });

  column.appendChild(linksList);
  return column;
}

// Helper function to create Payment Methods and Social Media column
function createPaymentSocialColumn() {
  const column = document.createElement('div');
  column.className = 'footer-column';

  // Payment Methods section
  const paymentHeading = document.createElement('h3');
  paymentHeading.textContent = 'Payment Methods';
  column.appendChild(paymentHeading);

  const paymentMethods = document.createElement('div');
  paymentMethods.className = 'footer-payment-methods';

  const paymentTypes = ['VISA', 'Mastercard', 'DISCOVER', 'AMERICAN EXPRESS', 'SNAP', 'Apple Pay'];
  paymentTypes.forEach((type) => {
    const paymentDiv = document.createElement('div');
    paymentDiv.className = `payment-method ${type.toLowerCase().replace(' ', '-')}`;
    paymentDiv.textContent = type;
    paymentMethods.appendChild(paymentDiv);
  });

  column.appendChild(paymentMethods);

  // Follow Us section
  const socialHeading = document.createElement('h3');
  socialHeading.textContent = 'Follow Us';
  socialHeading.style.marginTop = '30px';
  column.appendChild(socialHeading);

  const socialMedia = document.createElement('div');
  socialMedia.className = 'footer-social-media';

  const socialPlatforms = [
    { name: 'Facebook', icon: 'f' },
    { name: 'X', icon: 'X' },
    { name: 'Instagram', icon: '📷' },
    { name: 'YouTube', icon: '▶' },
    { name: 'TikTok', icon: '♪' },
    { name: 'Pinterest', icon: 'P' },
  ];

  socialPlatforms.forEach((platform) => {
    const socialLink = document.createElement('a');
    socialLink.className = 'social-icon';
    socialLink.href = '#';
    socialLink.setAttribute('aria-label', platform.name);
    socialLink.textContent = platform.icon;
    socialMedia.appendChild(socialLink);
  });

  column.appendChild(socialMedia);
  return column;
}

// Helper function to create legal section
function createLegalSection() {
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
    'ALDI International',
  ];

  legalLinkTexts.forEach((text) => {
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

  return legalSection;
}
