export default function decorate(block) {
    // Process the block content
    const rows = [...block.children];
    console.log('Found rows:', rows.length, rows);
    
    // Add class for each row based on index
    rows.forEach((row, index) => {
        row.classList.add(`teaser-aldi-row-${index + 1}`);
        
        // Handle row index 2 (3rd row) - use text content as anchor text in row index 3 and hide
        if (index === 2) {
            const textContent = row.textContent.trim();
            if (textContent) {
                // Find the anchor tag in row index 3 (4th row)
                const targetRow = rows[3];
                if (targetRow) {
                    const anchorTag = targetRow.querySelector('a');
                    if (anchorTag) {
                        anchorTag.textContent = textContent;
                    }
                }
            }
            // Hide the row
            row.style.display = 'none';
        }
        
        // Handle row index 5 (6th row) - use text content as class and hide
        if (index === 5) {
            const textContent = row.textContent.trim().toLowerCase();
            if (textContent) {
                // Convert text to valid CSS class name
                const className = textContent.replace(/[^a-z0-9]/g, '-');
                block.classList.add(`${className}`);
            }
            // Hide the row
            row.style.display = 'none';
        }
    });
}
