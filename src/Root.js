import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import API from 'api';
import Landing from 'containers/Landing';
import Groups from 'containers/Groups';
import Albums from 'containers/Albums';
import Photos from 'containers/Photos';
import Viewer from 'containers/Viewer';

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
      <Route path="/groups" component={Groups} />
      <Route path={'/albums:ownerId([\\d-]+)'} component={Albums} />
      <Route path={'/album:ownerId([\\d-]+)_:albumId'} component={Photos} />
      <Route path="/photo:ownerId([\d-]+)_:photoId" component={Photos} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Root;
