import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="main__footer">
      <Link to="/drinks" data-testid="link-drinks">
        <img
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/meals" data-testid="link-meals">
        <img
          src={ mealIcon }
          alt="comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
