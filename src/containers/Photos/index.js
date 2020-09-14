import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import API from 'api';
import { inflections } from 'helpers';
import { Title, Subtitle } from 'styles/common';
import { useGroup, useUser, useDocumentTitle } from 'helpers/hooks';
import Splitter from 'components/Splitter';
import Photo from './Photo';
import Loader from './Loader';
import { Photo as StyledPhoto } from './Photo/styled';
import * as Styled from './styled';
import Viewer from '../Viewer';

const Photos = props => {
  const { match: { params } } = props;

  // params
  const photoId = +params.photoId;

  // states
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({ title: '', size: 0 });
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [ownerId, setOwnerId] = useState(+params.ownerId);
  const [albumId, setAlbumId] = useState(+params.albumId);
  const [isGroup, setIsGroup] = useState(ownerId < 0);

  const [modalPhoto, setModalPhoto] = useState(null);
  const [isViewerOpened, setIsViewerOpened] = useState(!!photoId);

  const photosRef = useRef();

  const user = useUser(ownerId);
  const group = useGroup(ownerId);
  const history = useHistory();

  useEffect(() => {
    if (!photoId) {
      return;
    }

    API.photos.fetchPhotoById([`${ownerId}_${photoId}`])
      .then(response => {
        if (response.length) {
          const photo = response[0];

          setModalPhoto(photo);
          setOwnerId(photo.owner_id);
          setAlbumId(photo.album_id);
          setIsGroup(photo.owner_id < 0);
        }
      });
  }, [photoId, ownerId]);

  useEffect(() => {
    if (photoId) {
      setIsViewerOpened(true);
    }
  }, [photoId]);

  /**
   * Fetch initial data
   */
  useEffect(() => {
    if (!ownerId || !albumId) {
      return;
    }

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
    if (!ownerId || !albumId) {
      return;
    }

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

  const onViewerClose = () => {
    history.push(`/album${ownerId}_${albumId}`);
    setIsViewerOpened(false);
    setModalPhoto(null)
  };

  const subtitle = (
    <>
      {
        isGroup
          ? (
            <Link to="/groups">Сообщества</Link>
          )
          : (
            <Link to="/">Альбомы</Link>
          )
      }
      {isGroup && (
        <>
          <Splitter type="chevron" />
          <Link to={`/albums-${group.id}`}>{group.name}</Link>
        </>
      )}
      <Splitter type="chevron" />
      <span>{album.title}</span>
      <Splitter />
      <span>{`${album.size} ${inflections.photos(album.size)}`}</span>
    </>
  );

  return (
    <Styled.Photos ref={photosRef}>
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
      <Viewer
        photo={modalPhoto}
        isOpened={isViewerOpened}
        onClose={onViewerClose}
      />
    </Styled.Photos>
  );
};

export default Photos;
