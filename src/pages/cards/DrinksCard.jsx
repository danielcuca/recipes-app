import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MyContext from '../../context/MyContext';

function DrinksCard() {
  const { dataDrinks } = useContext(MyContext);

  return (
    <div>
      { dataDrinks.map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <Link
            to={ `/drinks/${drink.idDrink}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ `${drink.strDrink} ilustration` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
          </Link>
        </div>

      ))}
    </div>
  );
}

export default DrinksCard;
