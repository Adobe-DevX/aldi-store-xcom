export default function decorate(block) {
  // Find the text div (usually the second div in a teaser-aldi block)
  const textDiv = block.querySelector('div:nth-child(2)');

  if (textDiv) {
    // Get the authorable class from the block's data attributes
    const { textClass } = block.dataset;

    if (textClass) {
      // Add the authorable class to the text div
      textDiv.classList.add(textClass);
    } else {
      // Fallback to default class if no custom class is specified
      textDiv.classList.add('teaser-aldi-text');
    }
  }
}
