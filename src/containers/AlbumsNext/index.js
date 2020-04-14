import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { match } from 'path-to-regexp';
import { withRouter } from 'react-router-dom';

import API from 'api';
import AlbumNext from 'components/AlbumNext';
import { AlbumNext as StyledAlbumNext } from 'components/AlbumNext/styled';
import { Title } from 'styles/common';
import * as Styled from './styled';

class AlbumsNext extends Component {
  state = {
    albums: [],
    user: null,
  };

  componentDidMount() {
    API.auth.fetchCurrentUser()
      .then(user => {
        this.setState({ user });

        console.warn('>>>', user);
      });

    API.photos.fetchAlbums()
      .then(({ items }) => {
        console.warn(items);
        this.setState({
          albums: items,
        });
      });
  }

  getTitle = () => {
    const { user } = this.state;

    if (!user) {
      return '';
    }

    const { first_name, last_name } = user || {};
    return `${first_name} ${last_name}`;
  };

  render() {
    const { albums } = this.state;

    return (
      <Styled.AlbumsNext>
        <Title>{this.getTitle()}</Title>
        <Styled.Wrapper>
          {albums.map(album => <AlbumNext key={album.id} album={album} />)}
          <StyledAlbumNext />
          <StyledAlbumNext />
          <StyledAlbumNext />
          <StyledAlbumNext />
          <StyledAlbumNext />
        </Styled.Wrapper>
      </Styled.AlbumsNext>
    );
  }
}

AlbumsNext.propTypes = {};
AlbumsNext.defaultProps = {};

export default withRouter(AlbumsNext);
