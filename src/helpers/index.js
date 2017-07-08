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

export function getPhotoSize (sizes = []) {
	let image = sizes.find(size => size.type === 'q');
	if (!image) image = sizes.find(size => size.type === 'x');
	return image.src;
}

export function createPlaceholder (times, element) {
	let placeholder = [];
	for (let i = 0; i < times; i++)
		placeholder.push(element(i))
	return placeholder;
}