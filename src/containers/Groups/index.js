import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import Group from '../../components/Group';
import withImageOnLoad from '../../decorators/withImageOnLoad';

const GroupHOC = withImageOnLoad(Group);

import Loader from '../../components/Loader';
import { fetchGroups, groupsSelector } from '../../redux/groups';
import { declensionFriends, createPlaceholder, declensionGroups } from '../../helpers/index';

import './styles.scss';

class Groups extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    const { fetchGroups } = this.props;

    fetchGroups();

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
    const { isFetching, groups } = this.props;
    const { search } = this.state;

    const b = block('Friends');

    if (isFetching) return <Loader />;

    const filter = i =>
      i.name.toLowerCase().includes(search.toLowerCase());

    const list = groups.filter(filter).slice(0, 100).map(group =>
      <Group
        isLoaded
        key={group.id}
        group={group}
        imageSrc={group.photo_100}
      />,
    );

    let placeholders = createPlaceholder(11, (i) => <div key={i} className="friend" />);
    return (
      <div className={b()}>
        {/*<h1>Мои группы</h1>*/}
        {/*<h3>{groups.length} {declensionGroups(groups.length)}</h3>*/}

        <input
          className={b('searchInput')}
          type="text"
          value={search}
          autoFocus
          onChange={this.onSearchChange}
          placeholder={'Поиск по сообществам'}
        />

        <div className={b('list')}>
          {list}
          {placeholders}
        </div>
      </div>
    );
  }
}

Groups.propTypes = {};
Groups.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  const uid = ownProps.match.params.userId || state.user.user.id;

  return {
    groups: groupsSelector(state),
    isFetching: state.groups.isFetching,
  };
};

const mapDispatchToProps = {
  fetchGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
