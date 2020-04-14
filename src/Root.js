import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AlbumsNext from 'containers/AlbumsNext';
import PhotosNext from 'containers/PhotosNext';

const Root = () => (
  <Switch>
    <Route path={'/album:ownerId([\\d-]+)_:albumId'} component={PhotosNext} />
    <Route path={'/'} component={AlbumsNext} />
  </Switch>
);

export default Root;
