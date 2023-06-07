import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Login from './pages/Login';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="meals">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/drinks" component={ Drinks } />
        {/* <Route path="/drinks/:id" component={ DrinkDetails } /> */}
        <Route path="/meals" component={ Meals } />
        {/* <Route path="/meals/:id" component={ MealDetails } /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
