import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

export const fetchProducts = async (category = 'smartphones') => {
  const response = await axios.get(`${API_BASE}/products/category/${category}`);
  return response.data.products;
};

export const fetchAllProducts = async () => {
  const categories = ['laptops', 'smartphones', 'mobile-accessories', 'tablets'];
  const requests = categories.map(cat => axios.get(`${API_BASE}/products/category/${cat}`));
  const responses = await Promise.all(requests);
  return responses.flatMap(res => res.data.products);
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE}/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE}/products/categories`);
  const techSlugs = ['laptops', 'smartphones', 'lighting', 'automotive',
    'smart-home', 'smart-watches', 'mobile-accessories', 'gaming', 'tablets'];
  return response.data
    .filter(cat => techSlugs.includes(cat.slug))
    .map(cat => cat.slug);
};

export const fetchFeaturedProducts = async () => {
  const techCategories = [
    'smartphones',
    'laptops',
    'mobile-accessories',
    'tablets',
    'automotive',
    'lighting',
  ];

  const selectedProducts = [];

  for (const category of techCategories) {
    try {
      const response = await axios.get(`${API_BASE}/products/category/${category}`);
      const products = response.data.products;

      if (products.length >= 2) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        selectedProducts.push(shuffled[0], shuffled[1]);
      } else if (products.length === 1) {
        selectedProducts.push(products[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch ${category}:`, err);
    }
  }

  return selectedProducts;
};