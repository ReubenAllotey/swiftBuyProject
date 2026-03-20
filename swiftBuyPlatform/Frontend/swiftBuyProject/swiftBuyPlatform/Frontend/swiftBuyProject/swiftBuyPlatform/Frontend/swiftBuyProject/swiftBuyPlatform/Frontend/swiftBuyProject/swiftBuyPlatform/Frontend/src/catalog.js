import { categories, products } from "./data.js";
import { slugifyCategory } from "./utils.js";

export const categoryLookup = new Map(
  categories.map((category) => [category.slug, category]),
);

export const productLookup = new Map(
  products.map((product) => [product.id, product]),
);

export function getTagsScore(product) {
  return (
    (product.tags?.includes("featured") ? 2 : 0) +
    (product.tags?.includes("bestseller") ? 1 : 0)
  );
}

export function getFeaturedProducts(limit) {
  const items = products.filter((product) => product.tags?.includes("featured"));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getBestsellerProducts(limit) {
  const items = products.filter((product) =>
    product.tags?.includes("bestseller"),
  );
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getNewProducts(limit) {
  const items = products.filter((product) => product.tags?.includes("new"));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getRelatedProducts(productId, limit = 4) {
  const product = productLookup.get(productId);
  if (!product) {
    return [];
  }

  return products
    .filter((item) => item.category === product.category && item.id !== productId)
    .slice(0, limit);
}

export function filterProducts({
  searchTerm,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  minRating,
}) {
  return products.filter((product) => {
    if (searchTerm) {
      const haystack =
        `${product.name} ${product.description} ${product.category} ${product.brand}`.toLowerCase();
      if (!haystack.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    if (
      selectedCategories.length &&
      !selectedCategories.includes(slugifyCategory(product.category))
    ) {
      return false;
    }

    if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
      return false;
    }

    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    if (minRating > 0 && product.rating < minRating) {
      return false;
    }

    return true;
  });
}

export function sortProducts(items, sort) {
  const result = [...items];

  switch (sort) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          Number(Boolean(b.tags?.includes("new"))) -
          Number(Boolean(a.tags?.includes("new"))),
      );
      break;
    case "popularity":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => getTagsScore(b) - getTagsScore(a));
      break;
  }

  return result;
}
