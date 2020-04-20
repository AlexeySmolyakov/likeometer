import React, { useEffect, useState } from 'react';

import API from 'api';
import { inflectionAlbums } from 'helpers';
import { useGroup, useUser, useDocumentTitle } from 'helpers/hooks';
import { Title, Subtitle } from 'styles/common';
import AlbumNext from './Album';
import { Album as StyledAlbum } from './Album/styled';
import * as Styled from './styled';

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
      .then(({ items }) => {
        // remove system album `Photos where I am tagged`
        setAlbums(items.filter(i => i.id !== -9000));
      })
      .catch(console.warn);
  }, [ownerId, isGroup]);

  useDocumentTitle(`${title} - Likeometer`);

  return (
    <Styled.AlbumsNext>
      <Title>{title}</Title>
      <Subtitle>{`${albums.length} ${inflectionAlbums(albums.length)}`}</Subtitle>
      <Styled.Wrapper>
        {albums.map(album => <AlbumNext key={album.id} album={album} />)}
        <StyledAlbum />
        <StyledAlbum />
        <StyledAlbum />
        <StyledAlbum />
        <StyledAlbum />
      </Styled.Wrapper>
    </Styled.AlbumsNext>
  );
};

export default AlbumsNext;
