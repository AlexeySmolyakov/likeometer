/**
 * Inflect.
 * @param {number} number
 * @param {string} one
 * @param {string} two
 * @param {string} five
 * @return {string}
 */
export function inflect(number, [one, two, five]) {
  let nextNumber = Math.abs(number);
  nextNumber %= 100;
  if (nextNumber >= 5 && nextNumber <= 20) {
    return five;
  }
  nextNumber %= 10;
  if (nextNumber === 1) {
    return one;
  }
  if (nextNumber >= 2 && nextNumber <= 4) {
    return two;
  }
  return five;
}

/**
 * Preset inflections.
 */
export const inflections = {
  /**
   * @param {number} n
   * @return {string}
   */
  photos: n => inflect(n, ['фотография', 'фотографии', 'фотографий']),
  /**
   * @param {number} n
   * @return {string}
   */
  albums: n => inflect(n, ['альбом', 'альбома', 'альбомов']),
  /**
   * @param {number} n
   * @return {string}
   */
  groups: n => inflect(n, ['сообщество', 'сообщества', 'сообществ']),
  /**
   * @param {number} n
   * @return {string}
   */
  friends: n => inflect(n, ['друг', 'друга', 'друзей']),
  /**
   * @param {number} n
   * @return {string}
   */
  likes: n => inflect(n, ['понравилась', 'понравились', 'понравились']),
};

/**
 * VK image types.
 * @type {string[]}
 */
const types = ['w', 'z', 'y', 'r', 'q', 'p', 'o', 'x', 'm', 's'];

/**
 * VK image types mapping.
 */
const TYPES_MAP = { w: 10, z: 22, y: 30, x: 31, r: 40, q: 50, p: 60, o: 70, m: 80, s: 90 };

/**
 * Get image src from sizes array.
 * @param {string[]} sizes
 * @param {number} typeIndex
 * @return {string}
 */
export function getPhotoSrcFromSizes(sizes = [], typeIndex = 0) {
  const image = sizes.find(size => size.type === types[typeIndex]);

  if (!image) {
    return getPhotoSrcFromSizes(sizes, typeIndex + 1);
  }

  return image.url;
}

/**
 * Create placeholder.
 * @param {number} times
 * @param {Function} element
 * @return {[]}
 */
export function createPlaceholder(times, element) {
  const placeholder = [];
  for (let i = 0; i < times; i++) {
    placeholder.push(element(i));
  }
  return placeholder;
}

/**
 * Get image src from sizes array.
 * @param {{width: number, height: number, type: string}[]} sizes
 * @return {string}
 */
export const getAlbumImageSrc = ({ sizes }) => {
  if (!sizes.length) return '';

  const processedSizes = sizes
    .filter(i => i.width <= 605 && i.height <= 605)
    .map(i => ({ ...i, typeIndex: TYPES_MAP[i.type] }))
    .sort((a, b) => a.typeIndex - b.typeIndex);

  return processedSizes[0].src;
};
