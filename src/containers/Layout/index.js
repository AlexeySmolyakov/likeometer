import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import API from '../../api';
import './styles.scss';
import Photos from '../Photos/index';
import { fetchUser, userSelector } from '../../redux/user';
import PrivateRoute from '../../components/PrivateRoute';
import Albums from '../Albums/index';
import Friends from '../Friends';

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

    return (
      <BrowserRouter>
        <div className={'Layout'}>
          <div className={'LayoutHeader'}>
            <Header user={user} />
          </div>
          <div className={'LayoutContent'}>
            <PrivateRoute path={'/albums:ownerId'} component={Albums} />
            <PrivateRoute path={'/friends:userId?'} component={Friends} />
          </div>
        </div>
      </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);