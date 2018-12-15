import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import API from '../../api';
import Photos from '../Photos/index';
import { fetchUser, userSelector } from '../../redux/user';
import PrivateRoute from '../../components/PrivateRoute';
import Albums from '../Albums/index';
import Friends from '../Friends/index';

import './styles.scss';

class Layout extends Component {
  state = {
    user: null,
    isLoading: true,
    hasErrors: false,
  };

  componentDidMount() {
    const { fetchUser } = this.props;

    API.auth.checkAuth()
    .then(fetchUser)
    .then(({ value: user }) => {
      this.setState({
        user,
        isLoading: false,
      });
    })
    .catch(error => {
      console.warn(error);

      this.setState({
        isLoading: false,
        hasErrors: error,
      });
    });
  }

  render() {
    const { user, isLoading, hasErrors } = this.state;

    if (isLoading || hasErrors || !user) return null;

    console.warn(this.props);

    return (
      <div className={'Layout'}>
        <div className={'LayoutHeader'}>
          <Header user={user} />
        </div>
        <div className={'LayoutContent'}>
          <Route path={'/albums:ownerId'} component={Albums} />
          <Route path={'/friends:userId?'} component={Friends} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};
Layout.defaultProps = {};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));