import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MyContext from '../../context/MyContext';
import '../Drinks.css';
import Loading from '../../components/Loading';

function DrinksCard() {
  const { dataDrinks, isLoading } = useContext(MyContext);

  return (
    <div className="card__drinks">
      { isLoading ? <Loading /> : (
        <>
          { dataDrinks.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <Link
                to={ `/drinks/${drink.idDrink}` }
              >
                <img
                  className="drinks__img"
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ `${drink.strDrink} ilustration` }
                />
                <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
              </Link>
            </div>

          ))}
        </>
      )}
    </div>
  );
}

export default DrinksCard;
