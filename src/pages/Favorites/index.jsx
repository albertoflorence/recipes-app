import { useState, useEffect } from 'react';
import OptionFilter from '../../components/OptionFilter';
import getLocalStorage from '../../utils/localStorage';
import CardInfoFood from '../../components/CardInfoFood';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);

  useEffect(() => {
    const localFavorites = getLocalStorage.getItem('favoriteRecipes');
    setFavorites(localFavorites || []);
  }, []);

  return (
    <div className="container-favorites">
      <OptionFilter
        favorites={ favorites }
        setResultsFilter={ setResultsFilter }
        resultsFilter={ resultsFilter }
      />

      <section>
        {
          resultsFilter.map((result, index) => (
            <CardInfoFood
              key={ result.id }
              index={ index }
              photo={ result.image }
              name={ result.name }
              category={ result.category }
              nationality={ result.nationality }
              alcoholicOrNot={ result.alcoholicOrNot }
            />
          ))
        }
      </section>
    </div>
  );
}

export default Favorites;
