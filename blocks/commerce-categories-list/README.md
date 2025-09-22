# Commerce Categories List Block

A reusable EDS block that displays a grid of category cards fetched from the commerce GraphQL API.

## Features

- Fetches categories using GraphQL queries
- Displays categories in a responsive card layout
- Configurable parent category and maximum number of categories
- Optional category images (placeholder with first letter)
- Error handling and loading states
- Mobile-responsive design

## Configuration

The block can be configured with the following parameters:

### `parent-category-id` (string, optional)
- ID of the parent category to fetch subcategories from
- Leave empty to fetch categories from the default root category (ID: "2")
- Default: empty (fetches from root category "2")

### `max-categories` (number, optional)
- Maximum number of categories to display
- Default: 12

### `show-category-images` (boolean, optional)
- Whether to display category images
- Since category images are not available in the GraphQL schema, this shows a placeholder with the first letter of the category name
- Default: true

### `title` (string, optional)
- Title to display above the categories list
- Default: empty (no title displayed)

## Usage

### In AEM/CMS
1. Add the block to your page
2. Configure the parameters as needed
3. The block will automatically fetch and display categories

### In HTML
```html
<div class="block commerce-categories-list" 
     data-block-name="commerce-categories-list"
     data-title="Browse Our Categories"
     data-parent-category-id="2"
     data-max-categories="8"
     data-show-category-images="true">
</div>
```

## GraphQL Query

The block uses the following GraphQL query to fetch categories:

```graphql
query getCategoriesInCategory($id: String!) {
  categories(
    ids: [$id]
    roles: ["show_in_menu"]
    subtree: { depth: 2, startLevel: 1 }
  ) {
    id
    level
    name
    path
    urlKey
    urlPath
    parentId
  }
}
```

## Styling

The block includes comprehensive CSS styling with:
- Responsive grid layout
- Hover effects
- Loading and error states
- Mobile-first design
- CSS custom properties for theming

## Error Handling

The block handles various error scenarios:
- Network errors when fetching categories
- Invalid category IDs
- Empty category results
- GraphQL errors

## Dependencies

- `@dropins/tools/fetch-graphql.js` - For GraphQL queries
- `@dropins/tools/lib/aem/configs.js` - For configuration management
- `../../scripts/aem.js` - For block configuration reading
- `../../scripts/commerce.js` - For URL routing

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid support required for layout
- Fetch API support required for GraphQL queries
