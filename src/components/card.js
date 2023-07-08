import { cardsContainer, handleWatchingLikesState, handleDeleteCard } from '../pages/index.js';
// import { imagePopup, cardPopupImage, cardPopupCaption } from './utils.js';

const isLiked = (likesArr, userId) => {
	return Boolean(
		likesArr.find((likes) => {
			return likes._id === userId;
		})
	);
};

const watchingLikesState = (cardElement, likesArr, userId) => {
	const cardLikeButton = cardElement.querySelector('.card__like');
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');

	cardLikeCounter.textContent = likesArr.length;

	if (isLiked(likesArr, userId)) {
		cardLikeButton.classList.add('card__like_active')
	} else {
		cardLikeButton.classList.remove('card__like_active')
	}
};

const removeCard = (cardElement) => {
	cardElement.remove();
	cardElement = null;
};

class Card {
	constructor({ data, selector }) {
		this.name = data.name;
		this.link = data.link;
		this.owner = data.owner;
		this.likes = data.likes;
		this.selector = selector;
		this._id = data._id
	}

	_getElement() {
		const cardElement = document
			.querySelector(this.selector)
			.content.querySelector('.card')
			.cloneNode(true);
		return cardElement;
	}

	generate() {
		this._element = this._getElement();

	}
}
import PopupWithImage from './PopupwithImage.js';
import Popup from './Popup.js';

const imageClassPopup = new PopupWithImage('.popup__big-image', '.popup__image', '.popup__image-caption');
const popupImage = new Popup('.popup__big-image');
popupImage.setEventListeners();

function createCard(data, userId) {
	const cardsTemplate = document.querySelector('#cards-template').content;
	const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
	const cardElementImage = cardElement.querySelector('.card__image');
	const cardElementHeading = cardElement.querySelector('.card__heading');
	const cardLikeButton = cardElement.querySelector('.card__like');
	const cardDeleteButton = cardElement.querySelector('.card__trash-icon');

	cardElementImage.src = data.link;
	cardElementImage.alt = data.name;
	cardElementHeading.textContent = data.name;

	watchingLikesState(cardElement, data.likes, userId);

	if (data.owner._id !== userId) {
		cardDeleteButton.remove();
	}

	cardLikeButton.addEventListener('click', () => {
		handleWatchingLikesState(data._id, cardLikeButton.classList.contains('card__like_active'), cardElement)
	});

	cardDeleteButton.addEventListener('click', () => handleDeleteCard(data._id, cardElement));
	cardElementImage.addEventListener('click', () => {
		imageClassPopup.open({ name: data.name, link: data.link });
	});
	// cardElementImage.addEventListener('click', () => {
	// 	// popup.open();
	// 	cardPopupImage.alt = data.name;
	// 	cardPopupCaption.textContent = data.name;
	// 	cardPopupImage.src = data.link;
	// });

	return cardElement;
};

const renderCards = (cardsContainer, data, userId) => {
	const cardElement = createCard(data, userId);
	if (data.owner._id === userId) {
		cardsContainer.prepend(cardElement);
	} else {
		cardsContainer.append(cardElement);
	}

};

export { createCard, renderCards, removeCard, watchingLikesState };