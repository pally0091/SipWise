import { ENDPOINTS } from "./api.js";
import { transformCocktailData } from "./data.js";

// 1. Fetch a single cocktail by ID
export async function getCocktailById(id) {
  try {
    const response = await fetch(ENDPOINTS.lookupDetails(id));
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.drinks ? transformCocktailData(data.drinks[0]) : null;
  } catch (error) {
    console.error(`Error fetching cocktail ${id}:`, error);
    return null;
  }
}

// 2. Fetch a random cocktail (Great for your home page feature!)
export async function getRandomCocktail() {
  try {
    const response = await fetch(ENDPOINTS.getRandom);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.drinks ? transformCocktailData(data.drinks[0]) : null;
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    return null;
  }
}

// 3. Search cocktails by name
export async function searchCocktails(query) {
  try {
    const response = await fetch(ENDPOINTS.searchByName(query));
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    // Map over the array and transform every drink found
    return data.drinks ? data.drinks.map(transformCocktailData) : [];
  } catch (error) {
    console.error("Error searching cocktails:", error);
    return [];
  }
}
