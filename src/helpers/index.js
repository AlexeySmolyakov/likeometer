export function declension(number, one, two, five) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number === 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
}

export function inflectionPhotos(number) {
  return declension(number, 'фотография', 'фотографии', 'фотографий');
}

export function declensionAlbums(number) {
  return declension(number, 'альбом', 'альбома', 'альбомов');
}

export function declensionGroups(number) {
  return declension(number, 'группа', 'группы', 'групп');
}

export function declensionFriends(number) {
  return declension(number, 'друг', 'друга', 'друзей');
}

export function declensionLikes(number) {
  return declension(number, 'понравилась', 'понравились', 'понравились');
}

const types = ['w', 'z', 'y', 'r', 'q', 'p', 'o', 'm', 's'];
const TYPES_MAP = {
  w: 10,
  z: 22,
  y: 30,
  x: 31,
  r: 40,
  q: 50,
  p: 60,
  o: 70,
  m: 80,
  s: 90,
};

export function getPhotoSrcFromSizes(sizes = [], typeIndex = 0) {
  const image = sizes.find(size => size.type === types[typeIndex]);

  if (!image) {
    return getPhotoSrcFromSizes(sizes, typeIndex + 1);
  }

  return image.url;
}

export function createPlaceholder(times, element) {
  const placeholder = [];
  for (let i = 0; i < times; i++) {
    placeholder.push(element(i));
  }
  return placeholder;
}

export function sortPhotos(photos = []) {
  return photos.sort((a, b) => {
    if (a.likes.count > b.likes.count) return -1;
    if (a.likes.count < b.likes.count) return 1;
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });
}

export const getAlbumImageSrc = ({ sizes }) => {
  if (!sizes.length) return '';

  const processedSizes = sizes
    .filter(i => i.width <= 605 && i.height <= 605)
    .map(i => ({ ...i, typeIndex: TYPES_MAP[i.type] }))
    .sort((a, b) => a.typeIndex - b.typeIndex);

  return processedSizes[0].src;
};
