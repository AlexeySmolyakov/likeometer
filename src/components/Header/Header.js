import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import likeometer from '../../assets/likeometer2-02-02.svg';
import './styles.scss';

class Header extends Component {
  render() {
    const { user } = this.props;

    const b = block('Header');
    const image = { backgroundImage: `url(${user.photo_200_orig})` };

    return (
      <div className={b()}>
        <div className="wrap">
          <Link to={`/albums${user.id}`} className={'likeometer'}>
            <img src={likeometer} alt="Likeometer" />
          </Link>
          <NavLink className="links" to={`/albums${user.id}`}>
            <i className="fas fa-camera" />
            <span>фото</span>
          </NavLink>
          <NavLink className="links" to='/friends'>
            <i className="fas fa-user" />
            <span>друзья</span>
          </NavLink>
          <NavLink className="links" to='/groups'>
            <i className="fas fa-user-friends" />
            <span>группы</span>
          </NavLink>
          <div className="user">
            <div>{user.first_name}</div>
            <div className="image" style={image} />
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