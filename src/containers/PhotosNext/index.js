import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import API from 'api';
import { inflectionPhotos } from 'helpers';
import { Title, Subtitle } from 'styles/common';
import { useGroup, useUser, useDocumentTitle } from 'helpers/hooks';
import { Photo as StyledPhoto } from './Photo/styled';
import Photo from './Photo';
import Loader from './Loader';
import * as Styled from './styled';

const PhotosNext = props => {
  const { match: { params } } = props;

  // params
  const ownerId = +params.ownerId;
  const albumId = +params.albumId;
  const isGroup = ownerId < 0;

  // states
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({ title: '', size: 0 });
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const photosRef = useRef();

  const user = useUser(ownerId);
  const group = useGroup(ownerId);

  /**
   * Fetch initial data
   */
  useEffect(() => {
    // scroll to top on new page
    window.scrollTo({ top: 0 });

    // fetch albums
    API.photos.fetchAlbums({ owner_id: ownerId, album_ids: albumId })
      .then(albums => {
        // find album
        const currentAlbum = albums.items.find(i => i.id === albumId);

        // set album info
        setAlbum(currentAlbum);

        // change title
        document.title = `${currentAlbum.title} | Likeometer`;
      })
      .catch(console.warn);
  }, [ownerId, albumId]);

  /**
   * Infinite scroll
   */
  useEffect(() => {
    const onScroll = () => {
      const height = photosRef.current.clientHeight;
      const { innerHeight, pageYOffset } = window;

      if ((height - 300 < innerHeight + pageYOffset) && !isFetching && !isCompleted) {
        setPage(page + 1);
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching, isCompleted]);

  /**
   * Fetch photos.
   */
  useEffect(() => {
    const options = {
      album_id: albumId,
      owner_id: ownerId,
      offset: page * 100,
    };

    setIsFetching(true);

    API.photos.fetchPhotos(options)
      .then(({ items }) => {
        setIsFetching(false);
        setPhotos(p => [...p, ...items]);
      })
      .catch(console.warn);
  }, [ownerId, albumId, page]);

  useEffect(() => setIsCompleted(photos.length === album.size), [album, photos]);

  const title = isGroup ? group.name : `${user.first_name} ${user.last_name}`;

  useDocumentTitle(`${album.title} - ${title}`);

  const subtitle = (
    <>
      <Link to="/groups">Сообщества</Link>
      {' › '}
      <Link to={`/albums-${group.id}`}>{group.name}</Link>
      {' › '}
      <span>{album.title}</span>
      {' • '}
      <span>{`${album.size} ${inflectionPhotos(album.size)}`}</span>
    </>
  );

  return (
    <Styled.PhotosNext ref={photosRef}>
      <Title>{album.title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Styled.Wrapper>
        {photos.map(photo => <Photo key={photo.id} photo={photo} />)}
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
      </Styled.Wrapper>
      <Loader loading={!isCompleted && (album.size > 100)} />
    </Styled.PhotosNext>
  );
};

export default PhotosNext;
