import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logoFull from '../images/logo-full.png';
import logo from '../images/logo.png';
import logoText from '../images/logo-text.png';

export default function Logo({ full = false, text = false }) {
  return (
    <Link className="logo" to="/meals">
      <img src={ full ? logoFull : logo } alt="logo" />
      {text && <img src={ logoText } alt="recipes app" className="mx-3" />}
    </Link>
  );
}

Logo.propTypes = {
  full: PropTypes.bool,
  text: PropTypes.bool,
};
