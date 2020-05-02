import React from 'react';

import image from 'assets/broken-heart.svg';

const NotFound = () => (
  <div className="error404">
    <img src={image} alt="Not found" className="image" />
    <div className="code">404</div>
  </div>
);

export default NotFound;
