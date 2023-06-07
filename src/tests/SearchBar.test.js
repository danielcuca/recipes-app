import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndContext';
import App from '../App';

const dataTestidBtnSearch = 'search-top-btn';
const dataTestidSearchInput = 'search-input';
const idexecbtn = 'exec-search-btn';
const idNameRadio = 'name-search-radio';
const idLetter = 'first-letter-search-radio';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  jest.spyOn(global, 'alert');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Testando o componente SearchBar na página de Meals', () => {
  it('se barra de pesquisa funciona', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
      const nameFood = screen.queryByText(/timbits/i);
      expect(nameFood).toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const ingredientRadio = screen.queryByTestId('ingredient-search-radio');
    const searchBtn = screen.queryByTestId(idexecbtn);

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, 'chicken');
      userEvent.click(ingredientRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('chicken');
      expect(ingredientRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/timbits/i)).not.toBeInTheDocument();
    });
  });

  it('se ao selecionar o filtro name na barra de pesquisa a lista de receitas é atualizada', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
      const nameFood = screen.queryByText(/timbits/i);
      expect(nameFood).toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const nameRadio = screen.queryByTestId(idNameRadio);
    const searchBtn = screen.queryByTestId(idexecbtn);

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(nameRadio).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, 'pizza');
      userEvent.click(nameRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('pizza');
      expect(nameRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/timbits/i)).not.toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/53014');
    });
  });

  it('se escolhendo o filtro letter ao digitar mais de 1 letra, aparece um alert', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
    });

    const nameFood = screen.queryByText(/timbits/i);
    expect(nameFood).toBeInTheDocument();
    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const letterRadio = screen.queryByTestId(idLetter);
    const searchBtn = screen.queryByTestId(idexecbtn);

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(letterRadio).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, 'aaa');
      userEvent.click(letterRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('aaa');
      expect(letterRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(global.alert).toBeCalled();
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
    });
  });

  it('se escolhendo o filtro letter a lista é atualizada', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const letterRadio = screen.queryByTestId(idLetter);
    const searchBtn = screen.queryByTestId(idexecbtn);

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(letterRadio).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, 'a');
      userEvent.click(letterRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('a');
      expect(letterRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/timbits/i)).not.toBeInTheDocument();
    });
  });
});

describe('Testando o componente SearchBar na página de Drinks', () => {
  it('se barra de pesquisa funciona', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
      const namedrink = screen.queryByText(/rose/i);
      expect(namedrink).toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const ingredientRadio = screen.queryByTestId('ingredient-search-radio');
    const searchBtn = screen.queryByTestId(idexecbtn);

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, 'salt');
      userEvent.click(ingredientRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('salt');
      expect(ingredientRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/rose/i)).not.toBeInTheDocument();
    });
    screen.debug();
  });

  it('se ao selecionar o filtro name na barra de pesquisa a lista de receitas é atualizada', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
    });

    const namedrink = screen.queryByText(/rose/i);
    expect(namedrink).toBeInTheDocument();

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const nameRadio = screen.queryByTestId(idNameRadio);
    const searchBtn = screen.queryByTestId(idexecbtn);

    act(() => {
      userEvent.type(searchInput, 'smashed');
      userEvent.click(nameRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('smashed');
      expect(nameRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/timbits/i)).not.toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178332');
    });
  });
  it('se ao selecionar o filtro name e digitar errado, aparece um alert', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
      const namedrink = screen.queryByText(/rose/i);
      expect(namedrink).toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const nameRadio = screen.queryByTestId(idNameRadio);
    const searchBtn = screen.queryByTestId(idexecbtn);

    act(() => {
      userEvent.type(searchInput, 'smashd');
      userEvent.click(nameRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('smashd');
      expect(nameRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  it('se ao selecionar o filtro letter e digitar mais de uma letra, aparece um alert', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
    });

    const namedrink = screen.queryByText(/rose/i);
    expect(namedrink).toBeInTheDocument();

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const letterRadio = screen.queryByTestId(idLetter);
    const searchBtn = screen.queryByTestId(idexecbtn);

    act(() => {
      userEvent.type(searchInput, 'ss');
      userEvent.click(letterRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('ss');
      expect(letterRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
    });
  });

  it('se ao selecionar o filtro letter a lista é atualizada', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument();
      const namedrink = screen.queryByText(/rose/i);
      expect(namedrink).toBeInTheDocument();
    });

    const btnSearch = screen.queryByTestId(dataTestidBtnSearch);
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId(dataTestidSearchInput);
    const letterRadio = screen.queryByTestId(idLetter);
    const searchBtn = screen.queryByTestId(idexecbtn);

    act(() => {
      userEvent.type(searchInput, 's');
      userEvent.click(letterRadio);
    });

    await waitFor(() => {
      expect(searchInput.value).toBe('s');
      expect(letterRadio).toBeChecked();
    });

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput.value}`);

    await waitFor(() => {
      expect(screen.queryByText(/rose/i)).not.toBeInTheDocument();
    });
  });
});
