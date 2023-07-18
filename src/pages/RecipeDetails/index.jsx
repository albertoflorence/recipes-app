import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMealOrDrink, fetchRecipeById } from '../../services';
import { mapPropertiesRecipe } from '../../utils/mapper';
import './RecipeDetails.css';
import Recommended from './Recommended';
import { recipeStatus } from '../../utils/localStorage';
import Share from '../../components/Share';
import Favorite from '../../components/Favorite';

const MAX_RECOMMENDED_RECIPES = 6;
const recipeButtonStatus = {
  inProgress: 'Continue Recipe',
  done: 'Finish Recipe',
  notStarted: 'Start Recipe',
};

function RecipeDetails() {
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const [, recipeType, recipeId] = location.pathname.split('/');
    const getRecipe = async () => {
      const data = await fetchRecipeById(recipeId, recipeType);
      setRecipe(mapPropertiesRecipe(data));
    };
    const getRecommendation = async () => {
      const data = await fetchMealOrDrink(recipeType === 'meals' ? 'drinks' : 'meals');
      setRecommendedRecipes(
        data.map(mapPropertiesRecipe).slice(0, MAX_RECOMMENDED_RECIPES),
      );
    };
    getRecipe();
    getRecommendation();
  }, [location]);
  const {
    alcoholicOrNot,
    category,
    id,
    image,
    ingredients,
    measures,
    instructions,
    name,
    type,
    video,
  } = recipe;
  if (!recipe.id) return null;
  return (
    <section>
      <header className="details-header">
        <img data-testid="recipe-photo" src={ image } alt={ `imagem de um ${name}` } />
        <span data-testid="recipe-category">{`${category} - ${alcoholicOrNot}`}</span>
        <Share data-testid="share-btn" id={ id } type={ type } />
        <Favorite data-testid="favorite-btn" recipe={ recipe } />
        <h1 data-testid="recipe-title">{name}</h1>
      </header>
      <div className="details-content">
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient} - ${measures[index]}`}
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p data-testid="instructions" className="instructions">
          {instructions}
        </p>
        <h3>Video</h3>
        {video && (
          <iframe
            title="video"
            data-testid="video"
            width="100%"
            height="275"
            src={ video }
          />
        )}
        <h3>Recommended</h3>
        <Recommended recipes={ recommendedRecipes } />
        <div className="details-action">
          <Link
            data-testid="start-recipe-btn"
            to={ `/${type}/${id}/in-progress` }
            className="btn btn-primary"
          >
            {recipeButtonStatus[recipeStatus(id, type)]}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
