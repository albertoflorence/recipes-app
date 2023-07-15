import './OptionFilter.css';

import PropTypes from 'prop-types';
import Icon from '../Icon';

const filters = [
  { name: 'All', icon: 'fastfood', testid: 'filter-by-all-btn', type: 'all' },
  { name: 'Food', icon: 'meal', testid: 'filter-by-meal-btn', type: 'meal' },
  { name: 'Drinks', icon: 'drink', testid: 'filter-by-drink-btn', type: 'drink' },
];

function OptionFilter({ onChange }) {
  return (
    <div className="option-filter">
      {filters.map(({ name, icon, testid, type }) => (
        <button key={ name } data-testid={ testid } onClick={ () => onChange(type) }>
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
