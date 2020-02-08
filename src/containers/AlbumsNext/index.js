import React, { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../../api';
import AlbumNext from '../../components/AlbumNext';
import { StyledAlbumsNext, Wrapper } from './styled';

class AlbumsNext extends Component {
  state = {
    albums: [],
  };
  
  componentDidMount() {
    API.photos.fetchAlbums()
      .then(({ items }) => {
        console.warn(items);
        this.setState({
          albums: items,
        });
      });
  }
  
  render() {
    const { albums } = this.state;
    
    return (
      <StyledAlbumsNext>
        <Wrapper>
          {albums.map(i => (
            <AlbumNext key={i.id} data={i} />
          ))}
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
          <AlbumNext/>
        </Wrapper>
      </StyledAlbumsNext>
    );
  }
}

AlbumsNext.propTypes = {};
AlbumsNext.defaultProps = {};

export default AlbumsNext;
