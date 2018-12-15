import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import withImageOnLoad from '../../decorators/withImageOnLoad';
import Friend from '../../components/Friend';

const FriendHOC = withImageOnLoad(Friend);

import Loader from '../../components/Loader';
import { fetchFriends } from '../../redux/friends';
import { declensionFriends, createPlaceholder } from '../../helpers/index';

import './styles.scss';

class Friends extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    const { fetchFriends } = this.props;

    fetchFriends();

    //document.addEventListener('keydown', this.addEvent, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.addEvent, false);
  }

  addEvent = (e) => {
    if (e.keyCode === 27) this.setState({ filter: '' });
    else if (e.code.includes('Key'))
      this.setState({ filter: this.state.filter + e.key.toUpperCase().trim() });
    else if (e.code === 'Backspace')
      this.setState({ filter: this.state.filter.substr(0, this.state.filter.length - 1) });
  };

  onSearchChange = e => {
    this.setState({ search: e.target.value.trim() });
  };

  render() {
    const { isFetching, friends } = this.props;
    const { search } = this.state;

    const b = block('Friends');

    if (isFetching) return <Loader />;

    const filter = i =>
      i.first_name.toLowerCase().includes(search.toLowerCase()) ||
      i.last_name.toLowerCase().includes(search.toLowerCase());

    const list = friends.filter(filter).slice(0, 30).map(friend =>
      <Friend
        isLoaded
        key={friend.id}
        friend={friend}
        imageSrc={friend.photo_100}
      />,
    );

    let placeholders = createPlaceholder(11, (i) => <div key={i} className="friend" />);
    return (
      <div className={b()}>
        <h1>Мои друзья</h1>
        <h3>{friends.length} {declensionFriends(friends.length)}</h3>

        <input
          className={b('searchInput')}
          type="text"
          value={search}
          onChange={this.onSearchChange}
          placeholder={'Начните вводить имя друга'}
        />

        <div className={b('list')}>
          {list}
          {placeholders}
        </div>
      </div>
    );
  }
}

Friends.propTypes = {};
Friends.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  const uid = ownProps.match.params.userId || state.user.user.id;
  const friends = state.friends.friends.items || [];

  return {
    friends,
    isFetching: state.friends.isFetching,
  };
};

const mapDispatchToProps = {
  fetchFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
