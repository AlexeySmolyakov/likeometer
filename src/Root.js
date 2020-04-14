import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import AlbumsNext from 'containers/AlbumsNext';
import PhotosNext from 'containers/PhotosNext';

const Root = (props) => {
  return (
    <Switch>
      <Route path={'/album:ownerId(\\d+)_:albumId'} component={PhotosNext} />
      <Route path={'/'} component={AlbumsNext} />
    </Switch>
  );
};

Root.propTypes = {};
Root.defaultProps = {};

export default Root;
