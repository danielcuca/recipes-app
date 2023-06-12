import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const { screen, waitFor, waitForElementToBeRemoved } = require('@testing-library/react');

const loading = 'Carregando ...';

describe('Testa página de Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (endpoint) => ({
      json: async () => {
        const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

        if (endpoint === MEALS_URL) {
          return meals;
        } if (endpoint === MEALS_CATEGORIES_URL) {
          return mealCategories;
        } return beefMeals;
      },
    }));
  });

  it('Verifica se API é chamada e elementos aparecem na tela.', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    screen.getByRole('heading', {
      name: /corba/i,
    });
  });

  it('Verifica funcionamento dos botões de categoria', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const btnCategory = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    screen.getByRole('heading', {
      name: /beef and mustard pie/i,
    });
  });

  it('Verifica funcionamento do botão All.', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const btnCategory = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /corba/i,
    })).toBeInTheDocument());
  });

  it('Verifica se ao clicar duas vezes no botão de categorias o filtro é desabilitado.', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    let btnCategory = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    btnCategory = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(btnCategory);

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /corba/i,
    })).toBeInTheDocument());
  });
});
