import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import DrinksCard from './cards/DrinksCard';

function Drinks() {
  const { fetchDrinks, isLoading } = useContext(MyContext);

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div>
      { isLoading ? <Loading />
        : <DrinksCard />}
    </div>
  );
}

export default Drinks;
