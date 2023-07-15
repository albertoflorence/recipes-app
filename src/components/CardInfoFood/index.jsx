import './style.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Share from '../Share';
import Favorite from '../Favorite';

function CardInfoFood({
  photo,
  index,
  name,
  category,
  nationality,
  alcoholicOrNot,
  type,
  recipe,
  id,
  setResultsFilter,
  setFavorites,
}) {
  return (
    <div className="content-card-info">
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          src={ photo }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          className="img-food-favorite"
          draggable="false"
        />

      </Link>
      <div className="info-food">
        <h5
          data-testid={
            `${index}-horizontal-top-text`
          }
        >
          {` ${alcoholicOrNot ? `${alcoholicOrNot}` : `${nationality} - ${category} `}`}
        </h5>
        <Link to={ `/${type}s/${id}` }>
          <p
            data-testid={
              `${index}-horizontal-name`
            }
          >
            { name }
          </p>
        </Link>

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
            setResultsFilter={ setResultsFilter }
            setFavorites={ setFavorites }
          />
        </div>
      </div>
    </div>
  );
}

CardInfoFood.propTypes = {
  photo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setResultsFilter: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default CardInfoFood;
