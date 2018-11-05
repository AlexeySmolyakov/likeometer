import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite';
import { connect } from 'react-redux';

import { fetchAlbums } from '../../actions/AlbumsActions';
import { userSelector } from '../../redux/user';
import './styles.scss';
import API from '../../api';

class Photos extends Component {
  state = {
    albums: [],
  };

  componentDidMount() {
    const { user, fetchAlbums } = this.props;

    //fetchAlbums({ owner_id: user.id })
    //.then(response => console.warn(response));

    return API.photos.fetchAlbums({ owner_id: 283925 })
    .then(response => {
      this.setState({ albums: response.items });
    });
  }

  render() {
    const { albums } = this.state;
    console.warn(albums);

    const b = block('Photos');

    return (
      <div className={b()}>
        {
          albums.map(i => (
            <div>
              <div key={i.id + Math.random()}>{i.title}</div>
              <div key={i.id}>{i.title}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

Photos.propTypes = {};
Photos.defaultProps = {};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);