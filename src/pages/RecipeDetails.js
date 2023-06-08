import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const url = history.location.pathname;

  const [recipeDetails, setRecipeDetails] = useState({
    imageUrl: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
    videoYT: '',
    alcoholic: '',
    recommendations: [],
    recipeDone: false,
  });

  const getIngredients = (data) => {
    const ingredientList = [];
    const maxIngredients = 20;

    for (let i = 1; i <= maxIngredients; i += 1) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (ingredient && measure) {
        ingredientList.push({ ingredient, measure });
      }
    }

    return ingredientList;
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        let mealAPI = '';
        let drinkAPI = '';

        if (url.includes(`/meals/${id}`)) {
          mealAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
          drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        } else if (url.includes(`/drinks/${id}`)) {
          drinkAPI = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
          mealAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }

        const mealResponse = await fetch(mealAPI);
        const mealData = await mealResponse.json();

        const drinkResponse = await fetch(drinkAPI);
        const drinkData = await drinkResponse.json();

        if (url.includes('/meals')) {
          const meal = mealData.meals[0];
          setRecipeDetails((prevState) => ({
            ...prevState,
            imageUrl: meal.strMealThumb,
            title: meal.strMeal,
            category: meal.strCategory,
            ingredients: getIngredients(meal),
            instructions: meal.strInstructions,
            videoYT: meal.strYoutube,
          }));
        } else if (url.includes('/drinks')) {
          const drink = drinkData.drinks[0];
          setRecipeDetails((prevState) => ({
            ...prevState,
            imageUrl: drink.strDrinkThumb,
            title: drink.strDrink,
            category: drink.strCategory,
            ingredients: getIngredients(drink),
            instructions: drink.strInstructions,
            alcoholic: drink.strAlcoholic,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [id, url]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const max = 6;

        if (url.includes('/meals')) {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
          const data = await response.json();

          if (data.drinks) {
            setRecipeDetails((prevState) => ({
              ...prevState,
              recommendations: data.drinks.slice(0, max),
            }));
          }
        } else if (url.includes('/drinks')) {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          const data = await response.json();

          if (data.meals) {
            setRecipeDetails((prevState) => ({
              ...prevState,
              recommendations: data.meals.slice(0, max),
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, [url]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isDone = doneRecipes.some((recipe) => recipe.id === id);

    setRecipeDetails((prevState) => ({
      ...prevState,
      recipeDone: isDone,
    }));
  }, [id]);

  const handleStartRecipe = () => {
    // a fazer
  };

  const {
    imageUrl,
    title,
    category,
    ingredients,
    instructions,
    videoYT,
    alcoholic,
    recommendations,
    recipeDone,
  } = recipeDetails;
  const ytId = -11;

  return (
    <div className="container">
      <h1 data-testid="recipe-title">{title}</h1>
      {url.includes('/meals') && title && (
        <p data-testid="recipe-category">{category}</p>
      )}
      <h2>Instructions:</h2>
      <p data-testid="instructions">{instructions}</p>
      {url.includes('/drinks') && instructions && (
        <p data-testid="recipe-category">{alcoholic}</p>
      )}
      <h2>Ingredients:</h2>
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient.measure} ${ingredient.ingredient}`}
          </p>
        </div>
      ))}
      {imageUrl && (
        <img
          className="img-recipe"
          src={ imageUrl }
          alt="Recipe"
          data-testid="recipe-photo"
        />
      )}
      {url.includes('/meals') && videoYT && (
        <iframe
          data-testid="video"
          title="Recipe Video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${videoYT.slice(ytId)}` }
          frameBorder="0"
          allowFullScreen
        />
      )}
      <div>
        <h2>Recommended</h2>
        <div style={ { display: 'flex', overflowX: 'scroll' } }>
          {recommendations.map((recipe, index) => (
            <div
              key={ index }
              style={ {
                flex: '0 0 200px',
                margin: '0 10px',
                padding: '10px',
                border: '1px solid #ccc',
                visibility: index > 1 ? 'hidden' : 'visible',
              } }
              data-testid={ `${index}-recommendation-card` }
            >
              <p data-testid={ `${index}-recommendation-title` }>
                {recipe.strDrink || recipe.strMeal}
              </p>
            </div>
          ))}
        </div>
      </div>
      {!recipeDone && (
        <button
          className="fixed-button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
        >
          Start Recipe
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
