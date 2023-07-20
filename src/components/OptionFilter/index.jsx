import './OptionFilter.css';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Icon from '../Icon';

const filters = [
  { name: 'All', icon: 'fastfood', testid: 'filter-by-all-btn', type: 'all' },
  { name: 'Food', icon: 'meal', testid: 'filter-by-meal-btn', type: 'meal' },
  { name: 'Drinks', icon: 'drink', testid: 'filter-by-drink-btn', type: 'drink' },
];

function OptionFilter({ onChange }) {
  const [currentFilter, setCurrentFilter] = useState();
  const handleClick = (type) => {
    setCurrentFilter(type);
    onChange(type);
  };
  return (
    <div className="option-filter">
      {filters.map(({ name, icon, testid, type }) => (
        <button
          key={ name }
          data-testid={ testid }
          onClick={ () => handleClick(type) }
          className={ currentFilter === type ? 'active' : '' }
        >
          <Icon name={ icon } large border />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

OptionFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default OptionFilter;
