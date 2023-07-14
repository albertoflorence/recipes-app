import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Profile from '../pages/Profile/index';

describe('Testes para o Profile', () => {
  it('Verifica se é exibido o email do usuário', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email2@email.com' }));
    renderWithRouterAndRedux(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toHaveTextContent('email2@email.com');
  });

  it('Verifica se o usuário é redirecionado para a página "Done Recipes" ao clicar no botão "Done Recipes"', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const profileDoneBtn = screen.getByTestId('profile-done-btn');

    act(() => {
      userEvent.click(profileDoneBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se o usuário é redirecionado para a página "Favorite Recipes" ao clicar no botão "Favorite Recipes"', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(profileFavoriteBtn);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se o usuário é redirecionado para a página "Login" e se limpa o armazenamento local ao clicar no botão "Logout"', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email1@email.com' }));
    const { history } = renderWithRouterAndRedux(<Profile />);
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    act(() => {
      userEvent.click(profileLogoutBtn);
    });

    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail.textContent).toBe('email1@email.com');
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');

    localStorage.clear();
  });
});
