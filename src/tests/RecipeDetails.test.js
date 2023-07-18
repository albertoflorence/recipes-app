import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import recipeMock from './recipeMock';
import { mockFetch } from './helpers/mockFetch';

describe('<RecipeDetails />', () => {
  beforeEach(() => {
    mockFetch();
  });

  it('Deveria renderizar a receita corretamente', async () => {
    renderWithRouter(<RecipeDetails />, '/meals/12345');
    const mockMeal = recipeMock[0];
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=12345',
    );
    expect(recipePhoto).toHaveAttribute('src', mockMeal.strMealThumb);
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(mockMeal.strMeal);
    expect(screen.getByTestId('instructions')).toHaveTextContent('test instructions');
    expect(screen.getAllByTestId(/ingredient-name-and-measure/i)).toHaveLength(13);
    expect(screen.getByTestId('video')).toHaveAttribute('src', mockMeal.strYoutube);
  });
  it('Deveria renderizar recomendações de drinks se a receita for uma meal', async () => {
    renderWithRouter(<RecipeDetails />, '/meals/12345');
    expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=12345');
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(await screen.findByTestId('0-recommendation-title')).toHaveTextContent('Corba');
    expect(screen.getByTestId('1-recommendation-title')).toHaveTextContent('Drink Test');
  });
  it('Deveria renderizar recomendações de meals se a receita for um drink', async () => {
    renderWithRouter(<RecipeDetails />, '/drinks/12345');
    expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12345');
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(await screen.findByTestId('0-recommendation-title')).toHaveTextContent('Corba');
    expect(screen.getByTestId('1-recommendation-title')).toHaveTextContent('Drink Test');
  });
});
