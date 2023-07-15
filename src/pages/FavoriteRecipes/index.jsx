import { useState } from 'react';
import OptionFilter from '../../components/OptionFilter';
import getLocalStorage from '../../utils/localStorage';
import CardInfoFood from '../../components/CardInfoFood';

function Favorites() {
  const [filter, setFilter] = useState('all');
  const [, forceUpdate] = useState(false);

  const favorites = getLocalStorage.getItem('favoriteRecipes') || [];
  const resultsFilter = favorites.filter(({ type }) => (filter === 'all' ? true
    : type === filter));

  return (
    <div className="container-favorites">
      <OptionFilter onChange={ setFilter } />

      <section>
        {
          resultsFilter.map((result, index) => (
            <CardInfoFood
              key={ result.id }
              index={ index }
              recipe={ result }
              onChange={ () => forceUpdate((s) => !s) }
            />
          ))
        }
      </section>
    </div>
  );
}

export default Favorites;
