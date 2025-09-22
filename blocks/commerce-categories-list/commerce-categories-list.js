import { getHeaders, getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { FetchGraphQL } from '@dropins/tools/fetch-graphql.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/commerce.js';

// GraphQL query for fetching categories with parent ID
const CATEGORIES_WITH_PARENT_QUERY = `
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
`;

/**
 * Fetches categories using GraphQL
 * @param {string} parentCategoryId - Parent category ID to fetch subcategories from
 * @param {number} pageSize - Maximum number of categories to fetch
 * @returns {Promise<Array>} Array of category objects
 */
async function fetchCategories(parentCategoryId, pageSize = 12) {
  try {
    const { fetchGraphQl, setEndpoint, setFetchGraphQlHeaders } = new FetchGraphQL().getMethods();

    // Set up GraphQL endpoint and headers
    const endpoint = getConfigValue('commerce-endpoint');
    if (!endpoint) {
      throw new Error('Commerce endpoint not configured');
    }

    setEndpoint(endpoint);
    setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

    // Use the provided parentCategoryId or default to root category "2"
    const categoryId = parentCategoryId || '2';

    // Execute GraphQL query with the category ID
    const variables = { id: categoryId };

    // Execute GraphQL query
    const { data, errors } = await fetchGraphQl(CATEGORIES_WITH_PARENT_QUERY, {
      method: 'GET',
      variables,
    });

    if (errors && errors.length > 0) {
      throw new Error(`GraphQL errors: ${errors.map((e) => e.message).join(', ')}`);
    }

    const categories = data?.categories || [];

    // Limit the number of categories if pageSize is specified
    return pageSize ? categories.slice(0, pageSize) : categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Creates a category card element
 * @param {Object} category - Category data object
 * @param {Object} config - Block configuration
 * @returns {HTMLElement} Category card element
 */
function createCategoryCard(category, config) {
  const card = document.createElement('a');
  card.className = 'category-card';
  card.href = rootLink(`/categories/${category.urlKey}`);

  // Create card structure
  const cardHTML = `
    ${config['show-category-images'] ? `
      <div class="category-card-image">
        <div class="placeholder">${category.name.charAt(0).toUpperCase()}</div>
      </div>
    ` : ''}
    <div class="category-card-body">
      <h3 class="category-card-title">${category.name}</h3>
      <div class="category-card-meta">
        <span class="category-card-count">Browse products</span>
      </div>
    </div>
  `;

  card.innerHTML = cardHTML;
  return card;
}

/**
 * Creates a loading state element
 * @returns {HTMLElement} Loading element
 */
function createLoadingState() {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Loading categories...';
  return loading;
}

/**
 * Creates an error state element
 * @param {string} message - Error message
 * @returns {HTMLElement} Error element
 */
function createErrorState(message) {
  const error = document.createElement('div');
  error.className = 'error';
  error.textContent = message || 'Failed to load categories. Please try again later.';
  return error;
}

/**
 * Creates an empty state element
 * @returns {HTMLElement} Empty state element
 */
function createEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'empty';
  empty.textContent = 'No categories found.';
  return empty;
}

/**
 * Main block decoration function
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);

  // Extract configuration values
  const parentCategoryId = config['parent-category-id'] || '';
  const maxCategories = parseInt(config['max-categories']) || 12;
  const showImages = config['show-category-images'] !== false;
  const title = config.title || '';

  // Create container structure
  const container = document.createElement('div');
  container.className = 'categories-container';

  // Clear block content and add loading state
  block.innerHTML = '';

  // Add title if provided
  if (title) {
    const titleElement = document.createElement('h2');
    titleElement.className = 'commerce-categories-list-title';
    titleElement.textContent = title;
    block.appendChild(titleElement);
  }

  block.appendChild(createLoadingState());

  try {
    // Fetch categories
    const categories = await fetchCategories(parentCategoryId, maxCategories);

    // Clear loading state
    block.innerHTML = '';

    if (!categories || categories.length === 0) {
      block.appendChild(createEmptyState());
      return;
    }

    // Filter out the parent category if it's included in results
    const filteredCategories = categories.filter(
      (cat) => !parentCategoryId || cat.id !== parentCategoryId,
    );

    // Create category cards
    filteredCategories.forEach((category) => {
      const card = createCategoryCard(category, {
        'show-category-images': showImages,
      });
      container.appendChild(card);
    });

    block.appendChild(container);
  } catch (error) {
    console.error('Error in commerce-categories-list block:', error);

    // Clear loading state and show error
    block.innerHTML = '';
    block.appendChild(createErrorState(error.message));
  }
}
