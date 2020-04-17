import React, { useEffect, useState } from 'react';

import API from 'api';
import { inflectionAlbums } from 'helpers';
import { Title, Subtitle } from 'styles/common';
import AlbumNext from './Album';
import { AlbumNext as StyledAlbumNext } from './Album/styled';
import * as Styled from './styled';
import { useGroup, useUser } from '../../helpers/hooks';

const AlbumsNext = props => {
  const { match: { params } } = props;

  // params
  const ownerId = +params.ownerId;
  const isGroup = ownerId < 0;

  // states
  const [albums, setAlbums] = useState([]);

  const user = useUser(ownerId);
  const group = useGroup(ownerId);

  const title = isGroup ? group.name : `${user.first_name} ${user.last_name}`;

  useEffect(() => {
    API.photos.fetchAlbums({ owner_id: ownerId })
      .then(({ items }) => setAlbums(items))
      .catch(console.warn);
  }, [ownerId, isGroup]);

  return (
    <Styled.AlbumsNext>
      <Title>{title}</Title>
      <Subtitle>{`${albums.length} ${inflectionAlbums(albums.length)}`}</Subtitle>
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
};

export default AlbumsNext;
