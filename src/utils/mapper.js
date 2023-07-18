const getValuesByProperty = (object, property) => Object.entries(object)
  .filter(([key, value]) => key.includes(property) && value && value.trim())
  .map(([, value]) => value);

export const mapPropertiesRecipe = (recipe) => {
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strInstructions,
    idMeal,
    idDrink,
    strArea,
    strAlcoholic,
    strTags,
    strYoutube,
  } = recipe;
  return {
    id: idMeal || idDrink,
    image: strMealThumb || strDrinkThumb,
    name: strMeal || strDrink,
    category: strCategory,
    instructions: strInstructions,
    ingredients: getValuesByProperty(recipe, 'Ingredient'),
    measures: getValuesByProperty(recipe, 'Measure'),
    type: strMeal ? 'meals' : 'drinks',
    nationality: strArea || '',
    alcoholicOrNot: strAlcoholic || '',
    tags: strTags ? strTags.split(',') : [],
    video: strYoutube,
  };
};
