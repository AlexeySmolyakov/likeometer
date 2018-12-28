import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import block from 'bem-cn-lite';
import { connect } from 'react-redux';

import { groupByIdSelector } from '../../redux/groups';
import { friendByIdSelector } from '../../redux/friends';
import { albumByIdSelector } from '../../redux/albums';
import arrow from '../../assets/right-double-chevron.svg';
import likeometer from '../../assets/likeometer2-02-02-05.svg';
import './styles.scss';

class Header extends Component {
  render() {
    const { user, owner, title, album } = this.props;

    const b = block('Header');
    const image = { backgroundImage: `url(${user.photo_200_orig})` };

    const ownerId = !owner ?
      null :
      owner.name ?
        -owner.id :
        owner.id;

    const ownerHref = owner ? `/albums${ownerId}` : `/`;

    const groupsClassName = !!(owner && owner.name) ? 'active' : '';

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
          <NavLink className={b('links', null, groupsClassName)} to='/groups'>
            <span>группы</span>
          </NavLink>
          {
            owner &&
            <Link to={ownerHref} className={b('title')}>
              <img src={arrow} alt="" />
              <span>{title}</span>
            </Link>
          }
          {
            owner && album &&
            <div className={b('title')}>
              <img src={arrow} alt="" />
              <span>{album.title}</span>
            </div>
          }
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
Header.defaultProps = {
  user: {},
};

const mapStateToProps = (state, ownProps) => {
  const { pathname } = ownProps.location;

  const regexp = new RegExp(/albums([-\d]+)|album([-\d]+)_/);
  const result = regexp.exec(pathname);
  const ownerId = result ? (+result[1] || +result[2]) : 0;

  const owner = ownerId > 0 ?
    friendByIdSelector(ownerId)(state) :
    groupByIdSelector(ownerId)(state);

  const albumRegexp = new RegExp(/album?[s\-\d]+_([\-\d]+)/);
  const albumResult = albumRegexp.exec(pathname);
  const albumId = albumResult ? +albumResult[1] : 0;

  const album = albumByIdSelector(ownerId, albumId)(state);

  if (!owner) return {};

  const title = ownerId > 0 ?
    `${owner.first_name} ${owner.last_name}` :
    owner.name;

  return {
    owner,
    title,
    album,
  };
};

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));