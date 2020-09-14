import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import API from 'api';
import Landing from 'containers/Landing';
import GroupsNext from 'containers/GroupsNext';
import AlbumsNext from 'containers/AlbumsNext';
import PhotosNext from 'containers/PhotosNext';

const Root = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.auth.checkAuth()
      .then(API.auth.fetchCurrentUser)
      .then(setUser)
      .catch(() => {
        setUser(false);
      });
  }, []);

  const onLogin = _user => {
    setUser(_user);
  };

  if (user === false) {
    return <Landing onLogin={onLogin} />;
  }

  if (user === null) {
    return null;
  }

  return (
    <Switch>
      <Redirect exact from="/" to={`/albums${user.id}`} />
      <Route path="/groups" component={GroupsNext} />
      <Route path={'/albums:ownerId([\\d-]+)'} component={AlbumsNext} />
      <Route path={'/album:ownerId([\\d-]+)_:albumId'} component={PhotosNext} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Root;
