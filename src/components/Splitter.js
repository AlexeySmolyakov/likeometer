import React from 'react';
import PropTypes from 'prop-types';

const Splitter = ({ type }) => {
  const mapping = {
    dot: '•',
    chevron: '›',
  };

  const symbol = mapping[type] || mapping.dot;

  return (
    <span className="splitter">
      {symbol}
    </span>
  );
};

Splitter.propTypes = {
  type: PropTypes.oneOf(['chevron', 'dot']),
};
Splitter.defaultProps = {
  type: 'dot',
};

export default Splitter;
