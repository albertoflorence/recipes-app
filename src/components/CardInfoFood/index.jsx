import './style.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Share from '../Share';
import Favorite from '../Favorite';

function CardInfoFood({ index, recipe, onChange }) {
  const { image, name, category, nationality, type, id, alcoholicOrNot } = recipe;
  return (
    <div className="content-card-info">
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          className="img-food-favorite"
          draggable="false"
        />
      </Link>
      <div className="info-food">
        <div className="info-food-title">
          <Link to={ `/${type}s/${id}` } data-testid={ `${index}-horizontal-name` }>
            <h3>{name}</h3>
          </Link>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {` ${alcoholicOrNot ? `${alcoholicOrNot}` : `${nationality} - ${category} `}`}
          </span>
        </div>
        <div className="options-food">
          <Share
            id={ id }
            type={ type }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <Favorite
            recipe={ recipe }
            data-testid={ `${index}-horizontal-favorite-btn` }
            id={ id }
            onChange={ onChange }
          />
        </div>
      </div>
    </div>
  );
}

CardInfoFood.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardInfoFood;
