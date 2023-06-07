import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header() {
  const { pathname } = useLocation();

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
    break;
  }

  const isMeals = pathname === '/meals';
  const isDrinks = pathname === '/drinks';
  const isProfile = pathname === '/profile';
  const isDone = pathname === '/done-recipes';
  const isFavorite = pathname === '/favorite-recipes';

  const handleClickSearch = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  return (
    <header className="header_container">
      <h1 data-testid="page-title">{pageTitle}</h1>

      {(isMeals || isDrinks) && (
        <Link
          to="/profile"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-btn" />
        </Link>
      )}

      {(isMeals || isDrinks) && (
        <button onClick={ handleClickSearch }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="search-btn" />
        </button>
      )}

      {(isProfile || isDone || isFavorite) && (
        <Link
          to="/profile"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-btn" />
        </Link>
      )}
      {
        searchBarVisible && <SearchBar />
      }

    </header>
  );
}

export default Header;
