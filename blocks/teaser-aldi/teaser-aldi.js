export default function decorate(block) {
    // Process the block content
    const rows = [...block.children];
    console.log('Found rows:', rows.length, rows);
    
    // Move content from row 0 and row 1 to row 0, then remove row 1
    if (rows.length >= 2) {
        const row0 = rows[0];
        const row1 = rows[1];
        
        // Move all content from row 1 to row 0
        while (row1.firstChild) {
            row0.appendChild(row1.firstChild);
        }
        
        // Remove row 1 from the DOM
        row1.remove();
        
        // Update the rows array to reflect the change
        rows.splice(1, 1);
    }
    
    // Add class for each row based on index
    rows.forEach((row, index) => {
        // Handle row index 2 (3rd row) - use text content as anchor text in row index 3 and remove
        if (index === 1) {
            const textContent = row.textContent.trim();
            if (textContent) {
                // Find the anchor tag in row index 3 (4th row)
                const targetRow = rows[2];
                if (targetRow) {
                    const anchorTag = targetRow.querySelector('a');
                    if (anchorTag) {
                        anchorTag.textContent = textContent;
                    }
                }
            }
            // Remove the row completely
            row.remove();
            // Update the rows array to reflect the removal
            rows.splice(index, 1);
        }
        
        // Handle row index 5 (6th row) - use text content as class and hide
        if (index === 3) {
            const textContent = row.textContent.trim().toLowerCase();
            if (textContent) {
                // Convert text to valid CSS class name
                const className = textContent.replace(/[^a-z0-9]/g, '-');
                block.classList.add(`${className}`);
            }
           // Remove the row completely
           row.remove();
           // Update the rows array to reflect the removal
           rows.splice(index, 1);
        }
    });

    rows.forEach((row, index) => {
        row.classList.add(`teaser-aldi-row-${index + 1}`);
    });
}
