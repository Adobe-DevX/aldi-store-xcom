# Teaser ALDI Block

A promotional banner block for ALDI Gear products, based on the hero block structure.

## Overview

This block creates a promotional banner that follows the same pattern as the hero block:
- **Background Image**: Full-width background image
- **Text Overlay**: Text content positioned over the background
- **Responsive Design**: Adapts to mobile, tablet, and desktop viewports
- **Customizable**: Supports custom CSS classes for text styling

## Design Assumptions & Placeholders

### Colors
The following color variables are used with fallback values:
- `--color-brand-700`: Dark navy background (#2b2b2b)
- `--color-neutral-100`: Light beige background (#fafafa)
- `--color-neutral-50`: White text (#fff)
- `--color-button-focus`: Focus outline color (#d6d6d6)

**To customize**: Update these CSS custom properties in your main stylesheet or override them in the block's CSS.

### Typography
- **Title**: Uses `--font-family-heading` (fallback: 'Roboto', sans-serif)
- **Subtitle & CTA**: Uses `--font-family-body` (fallback: 'Roboto', sans-serif)
- **Font sizes**: Responsive scaling from 2.5rem (mobile) to 4rem (large desktop)

**To customize**: Update the font-family variables or modify the font-size values in the CSS.

### Spacing
Uses your existing design token system:
- `--spacing-small`, `--spacing-medium`, `--spacing-big`, `--spacing-xxbig`
- `--spacing-xsmall` for small gaps

**To customize**: Adjust spacing values in your design token system.

### Product Layout
The product images are positioned using absolute positioning with specific classes:
- `teaser-aldi-product-1` through `teaser-aldi-product-7`
- Each has different sizes and positions to create the overlapping effect

**To customize**: Modify the positioning and sizing in the CSS for different layouts.

## Usage

### Content Structure
The block follows the same structure as the hero block:
1. **First div**: Background image
2. **Second div**: Text content (title, subtitle, CTA, etc.)

### Example HTML Structure
```html
<div class="teaser-aldi">
  <div>
    <picture>
      <img src="background-image.jpg" alt="ALDI Gear Background">
    </picture>
  </div>
  <div>
    <h1>ALDI Gear</h1>
    <p>Grab your gear before it's gone.</p>
    <a href="/shop">Shop Now ></a>
  </div>
</div>
```

### Content Structure Logic
The block:
- **First div**: Contains the background image (positioned absolutely)
- **Second div**: Contains text content (gets the `teaser-aldi-text` class or custom class)
- **Text styling**: Uses the same pattern as hero block with customizable CSS classes

## Features

### Accessibility
- **Semantic HTML**: Uses `<section>` and proper ARIA roles
- **Keyboard Navigation**: CTA button supports Enter and Space key activation
- **Screen Reader Support**: Proper aria-labels and alt text
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user's motion preferences

### Performance
- **Image Optimization**: Uses `createOptimizedPicture` for responsive images
- **Lazy Loading**: Images load asynchronously with `loading="lazy"`
- **Efficient Rendering**: Optimized DOM manipulation

### Responsive Design
- **Mobile First**: Base styles for mobile devices
- **Breakpoints**: 
  - Tablet: 768px
  - Desktop: 1024px
  - Large Desktop: 1440px
- **Flexible Layout**: Grid system adapts to different screen sizes

## Customization Options

### CSS Custom Properties
You can override these variables to match your brand:
```css
.teaser-aldi-container {
  --teaser-bg-dark: #your-brand-color;
  --teaser-bg-light: #your-light-color;
  --teaser-text-color: #your-text-color;
}
```

### Product Positioning
To change the product layout, modify the positioning classes:
```css
.teaser-aldi-product-1 {
  top: 10%;
  left: 5%;
  width: 80px;
  height: 60px;
  z-index: 3;
}
```

### Animation & Effects
The block includes hover effects and transitions. To customize:
```css
.teaser-aldi-product {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.teaser-aldi-product:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

## Browser Support
- Modern browsers with CSS Grid support
- Graceful degradation for older browsers
- High contrast mode support
- Reduced motion support

## Integration
This block integrates with your existing AEM Edge Delivery Services setup:
- Uses your existing design token system
- Follows your component structure conventions
- Compatible with your image optimization pipeline
- Supports your accessibility standards

## Maintenance
- **Image Updates**: Replace product images through the AEM interface
- **Content Updates**: Modify text content through the block configuration
- **Styling Updates**: Override CSS custom properties as needed
- **Performance**: Monitor image loading and optimize as necessary
