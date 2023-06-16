import { cardsContainer, handleWatchingLikesState, handleDeleteCard } from '../index.js';
import { imagePopup, cardPopupImage, cardPopupCaption } from './utils.js';
import { openPopup } from './modal.js';

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
		openPopup(imagePopup);
		cardPopupImage.alt = data.name;
		cardPopupCaption.textContent = data.name;
		cardPopupImage.src = data.link;
	});

	return cardElement;
};

const renderCards = ( cardsContainer, data, userId) => {
	const cardElement = createCard(data, userId);
	cardsContainer.prepend(cardElement);
};

export { createCard, renderCards, removeCard, watchingLikesState };