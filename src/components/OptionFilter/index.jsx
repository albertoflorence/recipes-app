import './style.css';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

import iconFastFood from '../../images/icon-fast-food.png';
import iconMeal from '../../images/icon-meal.png';
import iconDrink from '../../images/icon-drink.png';
// import filterFavorites from '../../utils/filterFavorites';

function OptionFilter({
  favorites,
  setResultsFilter,
}) {
  useEffect(() => {
    setResultsFilter(favorites);
  }, [favorites, setResultsFilter]);

  const filterByAll = (type) => {
    // const newFilter = filterFavorites(favorites, type);
    // setResultsFilter(newFilter);
    console.log(type);
  };

  return (
    <div className="content-filter-component">
      <button
        className="div-icon"
        data-testid="filter-by-all-btn"
        onClick={ () => filterByAll('all') }
      >
        <img
          src={ iconFastFood }
          alt="icone de comedas e bebidas"
          className="icon-fast-food"
        />
        <p>All</p>
      </button>

      <button
        className="div-icon"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ () => filterByAll('meal') }
      >
        <img
          src={ iconMeal }
          alt="icone de comedas e bebidas"
          className="icon-fast-food"
        />
        <p>Meals</p>
      </button>

      <button
        className="div-icon"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ () => filterByAll('drink') }
      >
        <img
          src={ iconDrink }
          alt="icone de comedas e bebidas"
          className="icon-fast-food"
        />
        <p>Drinks</p>
      </button>
    </div>
  );
}

OptionFilter.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setResultsFilter: PropTypes.func.isRequired,
};

export default OptionFilter;
