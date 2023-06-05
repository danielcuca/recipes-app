import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MyContext from '../../context/MyContext';

function MealsCard() {
  const { dataMeals } = useContext(MyContext);

  return (
    <div>
      { dataMeals.map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <Link
            to={ `/meals/${meal.idMeal}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ `${meal.strMeal} ilustration` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>

          </Link>
        </div>
      ))}
    </div>
  );
}

export default MealsCard;
