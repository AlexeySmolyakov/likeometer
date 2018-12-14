import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import likeometer from '../../assets/likeometer2-02-02-05.svg';
import './styles.scss';

class Header extends Component {
  render() {
    const { user } = this.props;

    const b = block('Header');
    const image = { backgroundImage: `url(${user.photo_200_orig})` };

    return (
      <div className={b()}>
        <div className={b('wrap')}>
          <Link to={`/albums${user.id}`} className={b('likeometer')}>
            <img src={likeometer} alt="Likeometer" />
          </Link>
          <NavLink className={b('links')} to={`/albums${user.id}`}>
            <span>фото</span>
          </NavLink>
          <NavLink className={b('links')} to='/friends'>
            <span>друзья</span>
          </NavLink>
          <NavLink className={b('links')} to='/groups'>
            <span>группы</span>
          </NavLink>
          <div className={b('user')}>
            <div>{user.first_name}</div>
            <div className={b('userPhoto')} style={image} />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
};
Header.defaultProps = {};

export default Header;