export default function decorate(block) {
  // Find the text div (usually the second div in a hero block)
  const textDiv = block.querySelector('div:nth-child(2)');
  
  if (textDiv) {
    // Add your custom class to the text div
    textDiv.classList.add('hero-text');
  }
}
