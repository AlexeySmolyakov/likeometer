import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AlbumsNext from 'containers/AlbumsNext';
import PhotosNext from 'containers/PhotosNext';
import API from './api';

const Root = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.auth.fetchCurrentUser()
      .then(setUser)
      .catch(console.warn);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Switch>
      <Redirect exact from={'/'} to={`/albums${user.id}`} />
      <Route path={'/albums:ownerId([\\d-]+)'} component={AlbumsNext} />
      <Route path={'/album:ownerId([\\d-]+)_:albumId'} component={PhotosNext} />
    </Switch>
  );
};

export default Root;
