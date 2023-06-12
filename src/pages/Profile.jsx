import React from 'react';
import { useHistory } from 'react-router-dom';

// const emailTest = JSON.stringify({ email: 'email@mail.com' });
// const progressRecipeTest = JSON.stringify({});

localStorage.setItem('user', '{"email":"email@mail.com"}');
localStorage.setItem('doneRecipes', '[]');
localStorage.setItem('favoriterecipes', '[]');
localStorage.setItem('inProgressRecipes', '{}');

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>PROFILE</h1>
      <p data-testid="profile-email">{ user.email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
