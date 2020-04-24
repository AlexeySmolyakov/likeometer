import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite';

import API from 'api';
import Group from '../../components/Group';
import { createPlaceholder } from '../../helpers/index';
import './styles.scss';

class Groups extends Component {
  state = {
    search: '',
    groups: [],
  };

  componentDidMount() {
    API.groups.fetchGroups()
      .then(({ items }) => {
        this.setState({ groups: items });
      });
  }

  onSearchChange = e => {
    this.setState({ search: e.target.value.trim() });
  };

  render() {
    const { search, groups } = this.state;

    const b = block('Friends');

    const list = groups.map(group => (
      <Group
        isLoaded
        key={group.id}
        group={group}
        imageSrc={group.photo_100}
      />
    ));

    const placeholders = createPlaceholder(11, i => <div key={i} className={'friend'} />);

    return (
      <div className={b()}>
        {/* <h1>Мои группы</h1> */}
        {/* <h3>{groups.length} {declensionGroups(groups.length)}</h3> */}

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

export default Groups;
