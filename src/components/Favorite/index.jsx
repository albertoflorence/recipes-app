import PropTypes from 'prop-types';

import { useState } from 'react';
import favoriteIcon from '../../images/favorite.png';
import favoriteIconFull from '../../images/favoriteFull.png';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import {
  isRecipeFavorite,
  favoriteRecipe,
} from '../../utils/localStorage';

export default function Favorite({
  recipe,
  'data-testid': testid,
  onChange = undefined,
}) {
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));

  const handleFavorite = () => {
    setIsFavorite((state) => !state);
    favoriteRecipe(recipe);
    if (onChange) {
      onChange();
    }
  };

  return (
    <button
      data-testid={ testid }
      onClick={ handleFavorite }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      aria-label={ isFavorite ? 'unfavorite' : 'favorite' }
    >
      <img
        src={ isFavorite ? favoriteIconFull : favoriteIcon }
        alt="favoritar receita"
      />
    </button>
  );
}

Favorite.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  'data-testid': PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
