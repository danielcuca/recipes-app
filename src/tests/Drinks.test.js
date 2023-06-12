import userEvent from '@testing-library/user-event';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const { screen, waitFor, waitForElementToBeRemoved } = require('@testing-library/react');

const loading = 'Carregando ...';

describe('Testa página de Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (endpoint) => ({
      json: async () => {
        const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

        if (endpoint === DRINKS_URL) {
          return drinks;
        } if (endpoint === DRINKS_CATEGORIES_URL) {
          return drinkCategories;
        } return cocoaDrinks;
      },
    }));
  });

  it('Verifica se API é chamada e elementos aparecem na tela.', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    screen.getByRole('heading', {
      name: /gg/i,
    });
  });

  it('Verifica funcionamento dos botões de categoria', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const btnCategory = screen.getByRole('button', {
      name: /cocoa/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa');

    screen.getByRole('heading', {
      name: /castillian hot chocolate/i,
    });
  });

  it('Verifica funcionamento do botão All.', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const btnCategory = screen.getByRole('button', {
      name: /cocoa/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /gg/i,
    })).toBeInTheDocument());
  });

  it('Verifica se ao clicar duas vezes no botão de categorias o filtro é desabilitado.', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    let carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    let btnCategory = screen.getByRole('button', {
      name: /cocoa/i,
    });

    userEvent.click(btnCategory);
    carregando = screen.getByText(loading);
    await waitForElementToBeRemoved(carregando);

    btnCategory = screen.getByRole('button', {
      name: /cocoa/i,
    });

    userEvent.click(btnCategory);

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /gg/i,
    })).toBeInTheDocument());
  });
});
