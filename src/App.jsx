import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails/index';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Layout from './pages/Layout';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        path="/meals/:id"
        component={ RecipeDetails }
      />
      <Route
        path="/meals"
        render={ () => (
          <Layout
            search
            footer
            pageTitle="Meals"
            pageIcon="meal"
          >
            <Recipes recipeType="meals" />
          </Layout>
        ) }
      />
      <Route
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        path="/drinks/:id"
        component={ RecipeDetails }
      />
      <Route
        path="/drinks"
        render={ () => (
          <Layout
            search
            pageTitle="Drinks"
            footer
            pageIcon="drink"
          >
            <Recipes recipeType="drinks" />
          </Layout>
        ) }
      />
      <Route
        path="/done-recipes"
        render={ () => (
          <Layout
            pageTitle="Done Recipes"
            pageIcon="done"
          >
            <DoneRecipes />
          </Layout>
        ) }
      />
      <Route
        path="/favorite-recipes"
        render={ () => (
          <Layout
            pageTitle="Favorite Recipes"
            pageIcon="favorite"
          >
            <FavoriteRecipes />
          </Layout>
        ) }
      />
      <Route
        path="/profile"
        render={ () => (
          <Layout
            footer
            pageTitle="Profile"
            pageIcon="profile"
          >
            <Profile />
          </Layout>
        ) }
      />
    </Switch>
  );
}

export default App;
