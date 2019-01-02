import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite';

import './styles.scss';

const Loader = ({ photosTotal, photosLoaded }) => {
  const b = block('Loader');

  return (
    <div className={b()}>
      <div className={b('spinner')} />
      {
        photosTotal > 0 &&
        <div className={b('info')}>{photosLoaded} / {photosTotal}</div>
      }
    </div>
  );
};

Loader.propTypes = {
  photosTotal: PropTypes.number,
  photosLoaded: PropTypes.number,
};
Loader.defaultProps = {
  photosTotal: 0,
  photosLoaded: 0,
};

export default Loader;