import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MyContext from '../../context/MyContext';
import '../Meals.css';
import Loading from '../../components/Loading';

function MealsCard() {
  const { dataMeals, isLoading } = useContext(MyContext);

  return (
    <div>
      { isLoading ? <Loading /> : (
        <>
          { dataMeals.map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <Link
                to={ `/meals/${meal.idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ `${meal.strMeal} ilustration` }
                  className="Meals__img"
                />
                <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>

              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MealsCard;
