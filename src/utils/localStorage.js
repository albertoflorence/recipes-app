const getLocalStorage = {
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getItem: (key) => {
    const result = localStorage.getItem(key);
    return result && JSON.parse(result);
  },
};

const mapProperties = (recipe) => ({
  alcoholicOrNot: recipe.alcoholicOrNot,
  category: recipe.category,
  id: recipe.id,
  image: recipe.image,
  name: recipe.name,
  nationality: recipe.nationality,
  type: recipe.type.replace('s', ''),
});

export const favoriteRecipe = (recipe) => {
  const recipes = getLocalStorage.getItem('favoriteRecipes') || [];
  const newRecipes = recipes.filter((r) => r.id !== recipe.id);
  if (newRecipes.length === recipes.length) {
    newRecipes.push(mapProperties(recipe));
  }
  getLocalStorage.setItem('favoriteRecipes', newRecipes);
};

export const isRecipeFavorite = (id) => {
  const recipes = getLocalStorage.getItem('favoriteRecipes') || [];
  return recipes.some((recipe) => recipe.id === id);
};

export const saveRecipe = (recipe) => {
  const recipes = getLocalStorage.getItem('doneRecipes') || [];
  const newRecipes = recipes.filter((r) => r.id !== recipe.id);
  newRecipes.push({
    ...mapProperties(recipe),
    doneDate: new Date(),
    tags: recipe.tags,
  });
  getLocalStorage.setItem('doneRecipes', newRecipes);
};

export const getDoneRecipes = () => getLocalStorage.getItem('doneRecipes') || [];

export const saveInProgressRecipe = (id, ingredients, type) => {
  const recipes = getLocalStorage.getItem('inProgressRecipes') || {
    meals: {},
    drinks: {},
  };
  recipes[type][id] = ingredients;
  getLocalStorage.setItem('inProgressRecipes', recipes);
};

export const getInProgressRecipes = (type) => {
  const recipes = getLocalStorage.getItem('inProgressRecipes') || {};
  return recipes[type] || {};
};

export const recipeStatus = (id, type) => {
  if (getDoneRecipes().some((recipe) => recipe.id === id)) {
    return 'done';
  }
  if (
    Object.prototype.hasOwnProperty.call(
      getInProgressRecipes(type),
      id,
    )
  ) {
    return 'inProgress';
  }
  return 'notStarted';
};
export default getLocalStorage;
