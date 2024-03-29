import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Meals from './pages/Recipes';
import Login from './pages/Login';
import Footer from './components/Footer';
import Header from './components/Header';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
