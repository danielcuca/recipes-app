import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do componet "Profile"', () => {
  test('Testa se o email esta sendo renderizado na tela', () => {
    renderWithRouter(<Profile />);

    const emailInScreen = screen.getByTestId('profile-email');
    expect(emailInScreen).toBeInTheDocument();
  });
  test('Testa se os botoes estao sendo renderizados na tela', () => {
    renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  test('Testa se ao clicar no botao "Done Recipes", a rota se altera', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar no botao "Favorite Recipes", a rota se altera', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar no botao "Logout", a rota se altera', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o localStorage se limpa apos clicar em logout', () => {});
  test('', () => {});
});
