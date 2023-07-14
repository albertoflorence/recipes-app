import './style.css';

import PropTypes from 'prop-types';

import iconShare from '../../images/share.png';
import iconFavoriteFull from '../../images/favoriteFull.png';

function CardInfoFood({ photo, index, name, category, nationality, alcoholicOrNot }) {
  return (
    <div className="content-card-info">
      <img
        src={ photo }
        alt=""
        data-testid={ `${index}-horizontal-image` }
        className="img-food-favorite"
        draggable="false"
      />
      <div className="info-food">
        <h5
          data-testid={
            `${index}-horizontal-top-text`
          }
        >
          {` ${alcoholicOrNot ? `${alcoholicOrNot}` : `${nationality} - ${category} `}`}
        </h5>

        <p
          data-testid={
            `${index}-horizontal-name`
          }
        >
          { name }
        </p>

        <div className="options-food">
          <button>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ iconShare }
              alt=""
              draggable="false"
            />
          </button>

          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ iconFavoriteFull }
            alt=""
            draggable="false"
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
};

export default CardInfoFood;
