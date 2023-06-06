import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
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
