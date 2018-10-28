import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import Landing from './Landing';
import Header from '../components/Header/Header';
import Albums from './Albums';
import Groups from './Groups';
import Friends from './Friends';
import NotFound from '../components/NotFound';
import PhotosWithViewer from './PhotosWithViewer';
import { checkAuth } from '../actions/AuthActions';
import '../assets';

class Root extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const { user, checkingAuth } = this.props;

    const basename = process.env.NODE_ENV === 'production' ? '/likeometer-redux' : '/';

    if (!checkingAuth && !user.id) return <Landing />;
    if (checkingAuth) return null;

    return (
      <BrowserRouter history={history} basename={basename}>
        <div className="layout">
          <div className="views">
            <Header user={user} />
            <Switch>
              <Redirect exact={true} from='/' to={`/albums${user.id}`} />
              <PrivateRoute path="/albums:ownerId" component={Albums} />
              <PrivateRoute path="/:page:ownerId([\d\-]+)_:objectId" component={PhotosWithViewer} />
              <PrivateRoute path="/friends:userId?" component={Friends} />
              <PrivateRoute path="/groups:userId?" component={Groups} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  checkingAuth: state.user.checkingAuth,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth() {
    return dispatch(checkAuth());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);