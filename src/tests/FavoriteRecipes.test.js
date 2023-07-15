import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipesMock = [
  {
    name: 'Recipe 1',
    image: 'recipe1.jpg',
    doneDate: '2023-07-01',
    tags: ['tag1', 'tag2'],
    nationality: 'Italian',
    category: 'Main Course',
    id: 'recipe1',
    type: 'meal',
    alcoholicOrNot: '',
  },
  {
    name: 'Recipe 2',
    image: 'recipe2.jpg',
    doneDate: '2023-07-02',
    tags: ['tag3', 'tag4'],
    nationality: 'Brazilian',
    category: 'drink',
    id: 'recipe2',
    type: 'drink',
    alcoholicOrNot: 'alcoholic',
  },
];

const mockLocalStorage = (favoriteRecipes = favoriteRecipesMock) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

describe('<FavoriteRecipes />', () => {
  beforeEach(() => {
    mockLocalStorage();
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('A página deveria renderizar corretamente se não tiver nenhuma receita favoritada', () => {
    mockLocalStorage(null);
    renderWithRouter(<FavoriteRecipes />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /food/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  });
  it('Deveria renderizar todas as recipes favoritas', () => {
    renderWithRouter(<FavoriteRecipes />);
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'recipe1.jpg');
    expect(screen.getByTestId('0-horizontal-name')).toHaveAttribute('href', '/meals/recipe1');
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Recipe 1');
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Main Course');

    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('Recipe 2');
  });
  it('Deveria renderizar apenas receitas filtradas por drink', () => {
    renderWithRouter(<FavoriteRecipes />);
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    act(() => {
      userEvent.click(drinkFilter);
    });
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'recipe2.jpg');
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
  });
  it('Deveria renderizar receitas filtradas por meal', () => {
    renderWithRouter(<FavoriteRecipes />);
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    act(() => {
      userEvent.click(mealFilter);
    });
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Main Course');
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
  });
  it('Deveria atualizar as receitas corretamente ao desfavoritar uma receita', () => {
    renderWithRouter(<FavoriteRecipes />);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    act(() => {
      userEvent.click(favoriteBtn);
    });
    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
  });
});
