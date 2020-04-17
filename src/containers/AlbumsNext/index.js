import React, { useEffect, useState } from 'react';

import API from 'api';
import { inflectionAlbums } from 'helpers';
import { Title, Subtitle } from 'styles/common';
import AlbumNext from './Album';
import { AlbumNext as StyledAlbumNext } from './Album/styled';
import * as Styled from './styled';

const AlbumsNext = props => {
  const { match: { params } } = props;

  // params
  const ownerId = +params.ownerId;
  const isGroup = ownerId < 0;

  // states
  const [title, setTitle] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // fetch groups
    if (isGroup) {
      API.groups.fetchGroupsById({ group_ids: [-ownerId] })
        .then(groups => {
          if (groups[0]) {
            setTitle(groups[0].name);
          }
        })
        .catch(console.warn);
    } else {
      API.users.fetchUsers({ user_ids: [ownerId] })
        .then(users => {
          if (users[0]) {
            const { last_name, first_name } = users[0];
            setTitle(`${first_name} ${last_name}`);
          }
        })
        .catch(console.warn);
    }

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
