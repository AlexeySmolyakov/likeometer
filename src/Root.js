import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import AlbumsNext from './containers/AlbumsNext';

const Root = (props) => {
  return (
    <Switch>
      <Route exact path={'/'} component={AlbumsNext} />
    </Switch>
  );
};

Root.propTypes = {};
Root.defaultProps = {};

export default Root;
