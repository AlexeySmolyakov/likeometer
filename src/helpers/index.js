export function declension (number, one, two, five) {
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

export function declensionPhotos (number) {
	return declension(number, 'фотография', 'фотографии', 'фотографий');
}

export function declensionAlbums (number) {
	return declension(number, 'альбом', 'альбома', 'альбомов');
}

export function declensionGroups (number) {
	return declension(number, 'группа', 'группы', 'групп');
}

export function declensionFriends (number) {
	return declension(number, 'друг', 'друга', 'друзей');
}

export function declensionLikes (number) {
	return declension(number, 'понравилась', 'понравились', 'понравились');
}

const types = ['x', 'w', 'z', 'y', 'r', 'q', 'p', 'o', 'm', 's'];

export function getPhotoSrcFromSizes (sizes = [], typeIndex = 0) {
	const image = sizes.find(size => size.type === types[typeIndex]);
	if (!image) return getPhotoSrcFromSizes(sizes, typeIndex + 1);
	else return image.src;
}

export function createPlaceholder (times, element) {
	let placeholder = [];
	for (let i = 0; i < times; i++)
		placeholder.push(element(i))
	return placeholder;
}

export function sortPhotos (photos = []) {
	return photos.sort((a, b) => {
		if (a.likes.count > b.likes.count) return -1;
		if (a.likes.count < b.likes.count) return 1;
		if (a.id > b.id) return -1;
		if (a.id < b.id) return 1;
		return 0;
	});
}