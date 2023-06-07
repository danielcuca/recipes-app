import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('Testando o componente SearchBar', () => {
  it('se na pagina Meals a barra de pesquisa funciona', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const btnSearch = screen.queryByTestId('search-top-btn');
    act(() => {
      userEvent.click(btnSearch);
    });
    const searchInput = screen.queryByTestId('search-input');

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(searchInput, '');
    });
  });
});
