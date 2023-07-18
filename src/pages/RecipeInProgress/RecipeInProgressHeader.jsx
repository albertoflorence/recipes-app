import PropTypes from 'prop-types';

import Icon from '../../components/Icon';
import Share from '../../components/Share';
import Favorite from '../../components/Favorite';

export default function RecipeInProgressHeader({ recipe }) {
  const { image, name, category, id, type, alcoholicOrNot } = recipe;
  const iconName = category.toLowerCase();

  return (
    <header className="progress-header">
      <img data-testid="recipe-photo" src={ image } alt={ name } />
      <div className="progress-header-content">
        <div>
          <Icon name={ iconName } border buttonType />
          <span data-testid="recipe-category">
            {`${alcoholicOrNot}${
              alcoholicOrNot ? ' - ' : ''
            }${category}`}
          </span>
        </div>
        <div>
          <Share id={ id } type={ type } data-testid="share-btn" />
          <Favorite recipe={ recipe } data-testid="favorite-btn" />
        </div>
      </div>
      <h2 data-testid="recipe-title">{name}</h2>
    </header>
  );
}

RecipeInProgressHeader.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
};
