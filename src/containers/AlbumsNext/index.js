import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import API from 'api';
import { inflections } from 'helpers';
import { useGroup, useUser, useDocumentTitle } from 'helpers/hooks';
import { Title, Subtitle } from 'styles/common';
import Splitter from 'components/Splitter';
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

  const title = isGroup
    ? `${group.name}`
    : `${user.first_name} ${user.last_name}`;

  const subtitle = (
    <>
      {
        isGroup
          ? (
            <Link to="/groups">Сообщества</Link>
          )
          : (
            <>
              <Link to="/groups">Сообщества</Link>
              <Splitter />
              <span>Альбомы</span>
            </>
          )
      }
      {isGroup && (
        <>
          <Splitter type="chevron" />
          <span>{title}</span>
        </>
      )}
      <Splitter />
      <span>{`${albums.length} ${inflections.albums(albums.length)}`}</span>
    </>
  );

  useEffect(() => {
    API.photos.fetchAlbums({ owner_id: ownerId })
      .then(({ items }) => {
        // remove system album `Photos where I am tagged`
        setAlbums(items.filter(i => i.id !== -9000));
      })
      .catch(console.warn);
  }, [ownerId, isGroup]);

  useDocumentTitle(title);

  return (
    <Styled.AlbumsNext>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
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
