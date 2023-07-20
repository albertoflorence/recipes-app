import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Recommended({ recipes }) {
  return (
    <div className="slider">
      <div className="slider-inner">
        {recipes.map(({ id, name, image, type }, index) => (
          <div
            key={ id }
            className="slider-item"
            data-testid={ `${index}-recommendation-card` }
          >
            <img src={ image } alt={ name } />
            <Link data-testid={ `${index}-recommendation-title` } to={ `/${type}/${id}` }>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Recommended.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
