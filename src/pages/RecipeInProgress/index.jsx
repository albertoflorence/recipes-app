import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../../services';
import './RecipeInProgress.css';
import {
  getInProgressRecipes,
  saveInProgressRecipe,
  saveRecipe,
} from '../../utils/localStorage';

import RecipeInProgressHeader from './RecipeInProgressHeader';
import { mapPropertiesRecipe } from '../../utils/mapper';

export default function RecipeInProgress() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const [, recipeType, recipeId] = location.pathname.split('/');
    const fetchRecipe = async () => {
      const result = await fetchRecipeById(recipeId, recipeType);
      setRecipe(mapPropertiesRecipe(result));
    };
    fetchRecipe();
    const recipeIngredients = getInProgressRecipes(recipeType);
    setIngredientsDone(recipeIngredients[recipeId] || []);
  }, [location]);

  useEffect(() => {
    if (!recipe.id) return;
    const { id, type } = recipe;
    saveInProgressRecipe(id, ingredientsDone, type);
  }, [ingredientsDone, recipe]);

  const handleIngredientChange = (event, ingredientIndex) => {
    const { checked } = event.target;
    ingredientsDone[ingredientIndex] = true;
    setIngredientsDone((state) => {
      state[ingredientIndex] = checked;
      return [...state];
    });
  };

  const handleFinishRecipe = () => {
    saveRecipe(recipe);
    history.push('/done-recipes');
  };

  if (!recipe.id) return null;

  const { instructions, ingredients } = recipe;
  const isIngredientsAllDone = ingredientsDone.length === ingredients.length
    && ingredientsDone.every((ingredient) => ingredient);
  return (
    <div>
      <RecipeInProgressHeader recipe={ recipe } />
      <div className="progress-content">
        <div className="progress-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ ingredientsDone[index] ? 'lineThrough' : '' }
              >
                <label>
                  <input
                    type="checkbox"
                    className="ingredient-input"
                    onChange={ (event) => handleIngredientChange(event, index) }
                    checked={ Boolean(ingredientsDone[index]) }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p data-testid="instructions" className="progress-instructions">
          {instructions}
        </p>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !isIngredientsAllDone }
          className="btn btn-primary"
          onClick={ handleFinishRecipe }
        >
          Finish recipe
        </button>
      </div>
    </div>
  );
}
