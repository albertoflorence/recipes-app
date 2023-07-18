import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const location = useLocation();

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map(([, value]) => value);

  useEffect(() => {
    const recipeType = location.pathname.split('/')[1];
    const recipeId = location.pathname.split('/')[2];

    const getRecipe = async () => {
      const data = await fetchRecipeById(recipeId, recipeType);
      setRecipe(data);
    };
    getRecipe();
  }, [location]);
  const {
    strMeal, strDrink, strYoutube,
    strCategory, strInstructions,
    strImageSource, strAlcoholic,
  } = recipe;

  return (
    <div>
      {/* {strMeal || strDrink} */}
      {console.log(recipe)}

      <img
        data-testid="recipe-photo"
        src={ strImageSource }
        alt=""
      />
      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
      <h4 data-testid="recipe-category">
        {strAlcoholic}
      </h4>
      <h4 data-testid="recipe-category">
        {strCategory}
      </h4>
      <h3>Ingredients:</h3>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <p>
                { `${ingredient} - ${recipe[`strMeasure${index + 1}`]}` }
              </p>
            </li>
          ))
        }
      </ul>
      <h3>Instructions:</h3>
      <p data-testid="instructions">
        {strInstructions}
      </p>
      <iframe data-testid="video" title="video" src={ strYoutube } />
    </div>
  );
}

export default RecipeDetails;
