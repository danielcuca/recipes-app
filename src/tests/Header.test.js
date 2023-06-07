import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndContext';
import App from '../App';

const dataTestidTitle = 'page-title';
const dataTestidBtnProfile = 'profile-top-btn';
const dataTestidBtnSearch = 'search-top-btn';

describe('Testando o componente Header', () => {
  it('se renderiza corretamente o Header na pagina de Meals', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(profileIcon);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /profile/i })).toBeInTheDocument();
      expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
    });
  });
  it('se renderiza corretamente o Header na pagina de Drinks', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(profileIcon);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /profile/i })).toBeInTheDocument();
      expect(screen.queryByAltText('search-btn')).not.toBeInTheDocument();
    });
  });

  it('se renderiza corretamente o Header na pagina de Profile', () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('se renderiza corretamente o Header na pagina de Profile', () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).not.toBeInTheDocument();

    screen.debug();
  });

  it('se renderiza corretamente o Header na pagina de Done Recipes', () => {
    renderWithRouterAndRedux(<App />, '/done-recipes');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    const textPageTitle = screen.queryByRole('heading', { name: /done recipes/i });
    expect(textPageTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).not.toBeInTheDocument();

    screen.debug();
  });

  it('se renderiza corretamente o Header na pagina de Favorites Recipes', () => {
    renderWithRouterAndRedux(<App />, '/favorite-recipes');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    const textPageTitle = screen.queryByRole('heading', { name: /favorite recipes/i });
    expect(textPageTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);
    expect(searchBtn).not.toBeInTheDocument();

    screen.debug();
  });

  it('se na página Meals ao clicar no botão de lupa, a barra de pesquisa é exibida', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    const textPageTitle = screen.queryByRole('heading', { name: /meals/i });
    expect(textPageTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);

    act(() => {
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('search-input')).toBeInTheDocument();
      expect(screen.queryByTestId('exec-search-btn')).toBeInTheDocument();
    });

    screen.debug();
  });

  it('se na página Drinks ao clicar no botão de lupa, a barra de pesquisa é exibida', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    const pageTitle = screen.queryByTestId(dataTestidTitle);
    const textPageTitle = screen.queryByRole('heading', { name: /drinks/i });
    expect(textPageTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    const profileIcon = screen.queryByTestId(dataTestidBtnProfile);
    expect(profileIcon).toBeInTheDocument();

    const searchBtn = screen.queryByTestId(dataTestidBtnSearch);

    act(() => {
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('search-input')).toBeInTheDocument();
      expect(screen.queryByTestId('exec-search-btn')).toBeInTheDocument();
    });

    screen.debug();
  });
});
