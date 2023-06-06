import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do component "Footer"', () => {
  test('testa se as imagens então sendo renderizadas na tela', () => {
    renderWithRouter(<Footer />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  test('se ao clicar na imagem "drinks" vai para "/drinks"', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkIcon = screen.getByTestId('link-drinks');

    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('se ao clicar na imagem "comida" vai para "/meals"', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealIcon = screen.getByTestId('link-meals');

    userEvent.click(mealIcon);

    expect(history.location.pathname).toBe('/meals');
  });
});
