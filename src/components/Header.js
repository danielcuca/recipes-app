import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pathname } = useLocation();
  const { history } = useHistory();

  const [searchBarVisible, setSearchBarVisible] = useState();

  let pageTitle = '';

  switch (pathname) {
  case '/meals':
    pageTitle = 'Meals';
    break;

  case '/drinks':
    pageTitle = 'Drinks';
    break;

  case '/profile':
    pageTitle = 'Profile';
    break;
  case '/done-recipes':
    pageTitle = 'Done Recipes';
    break;
  case '/favorite-recipes':
    pageTitle = 'Favorite Recipes';
    break;
  default:
    pageTitle = 'App de receitas';
    break;
  }

  const isMeals = pathname === '/meals';
  const isDrinks = pathname === '/drinks';
  const isProfile = pathname === '/profile';
  const isDone = pathname === '/done-recipes';
  const isFavorite = pathname === '/favorites';

  const handleClickProfile = () => {
    if (!isProfile) {
      history.push('/profile');
    }
  };

  const handleClickSearch = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  return (
    <header>
      <h1 data-testeid="page-title">{pageTitle}</h1>

      {(isMeals || isDrinks) && (
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ handleClickProfile }
        >
          <img src={ profileIcon } alt="profile-btn" />
        </button>
      )}

      {(isMeals || isDrinks) && (
        <button data-testid="search-top-btn" onClick={ handleClickSearch }>
          <img src={ searchIcon } alt="search-btn" />
        </button>
      )}

      {isProfile && (
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ handleClickProfile }
        >
          <img src={ profileIcon } alt="profile-btn" />
        </button>
      )}

      {isDone && (
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ handleClickProfile }
        >
          <img src={ profileIcon } alt="profile-btn" />
        </button>
      )}

      {isFavorite && (
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ handleClickProfile }
        >
          <img src={ profileIcon } alt="profile-btn" />
        </button>
      )}
      {
        searchBarVisible && <SearchBar />
      }

    </header>
  );
}

export default Header;
