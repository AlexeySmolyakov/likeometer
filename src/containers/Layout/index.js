import React, { Component } from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import API from '../../api';
import Albums from '../Albums/index';
import Header from '../../components/Header/index';
import Photos from '../Photos/index';
import Groups from '../Groups/index';
import Friends from '../Friends/index';
import { fetchUser, userSelector } from '../../redux/user';
import { fetchGroups } from '../../redux/groups';
import { fetchFriends } from '../../redux/friends';

import './styles.scss';

class Layout extends Component {
  state = {
    user: null,
    isLoading: true,
    hasErrors: false,
  };

  componentDidMount() {
    const { fetchUser, fetchGroups, fetchFriends } = this.props;

    API.auth.checkAuth()
    .then(() => {
      fetchGroups();
      fetchFriends();

      return fetchUser();
    })
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
      <div className={'Layout'}>
        <div className={'LayoutHeader'}>
          <Header user={user} />
        </div>
        <div className={'LayoutContent'}>
          <Switch>
            <Redirect exact from='/' to={`/albums${user.id}`} />
            <Route path={'/albums:ownerId'} component={Albums} />
            <Route path={'/friends:userId?'} component={Friends} />
            <Route path={'/groups:userId?'} component={Groups} />
            <Route path={'/:page:ownerId([\\d\\-]+)_:objectId'} component={Photos} />
          </Switch>
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
  fetchGroups,
  fetchFriends,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));