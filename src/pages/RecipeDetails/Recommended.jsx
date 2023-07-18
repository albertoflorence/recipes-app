import React from 'react';
import PropTypes from 'prop-types';

export default function Recommended({ recipes }) {
  return (
    <div className="slider">
      <div className="slider-inner">
        {recipes.map(({ id, name, image }, index) => (
          <div
            key={ id }
            className="slider-item"
            data-testid={ `${index}-recommendation-card` }
          >
            <img src={ image } alt={ name } />
            <div data-testid={ `${index}-recommendation-title` }>{name}</div>
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
    }),
  ).isRequired,
};
