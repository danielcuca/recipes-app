import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import MealsCard from './cards/MealsCard';

function Meals() {
  const { fetchMeals, isLoading } = useContext(MyContext);

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      { isLoading ? <Loading />
        : <MealsCard />}
    </div>
  );
}

export default Meals;
