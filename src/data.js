export const API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const ENDPOINTS = {
  searchByName: (name) =>
    `${API_BASE_URL}/search.php?s=${encodeURIComponent(name)}`,
  lookupDetails: (id) => `${API_BASE_URL}/lookup.php?i=${id}`,
  getRandom: `${API_BASE_URL}/random.php`,
  filterByIngredient: (ingredient) =>
    `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
};

// Transform the messy API structure into a clean JS object
export function transformCocktailData(drink) {
  if (!drink) return null;

  const ingredients = [];

  // Loop through the 15 possible ingredient fields
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    // If there's no ingredient left, break out of the loop
    if (!ingredient) break;

    ingredients.push({
      name: ingredient.trim(),
      measure: measure ? measure.trim() : "To taste",
    });
  }

  return {
    id: drink.idDrink,
    name: drink.strDrink,
    tag: drink.strTags ? drink.strTags.split(",").map((tag) => tag.trim()) : [],
    thumbnail: drink.strDrinkThumb,
    category: drink.strCategory,
    alcoholic: drink.strAlcoholic,
    glass: drink.strGlass,
    instructions: drink.strInstructions,
    ingredients: ingredients, // Clean array of [{name, measure}]
  };
}
