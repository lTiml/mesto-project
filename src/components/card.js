import { cardsContainer, handleWatchingLikesState, handleDeleteCard } from '../pages/index.js';
import { config } from './utils.js';

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

export default class Card {
	constructor(data, userId, cardsTemplate, { handleCardClick, handleDeleteClick, handleLikeClick }) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._likesCount = data.likes.length;
		this._id = data._id;
		this._ownerId = data.owner._id
		this._cardsTemplate = cardsTemplate;
		this._userId = userId;
	}

	_getElement() {
		this._card = document
			.querySelector(this.selector)
			.content.querySelector('.card')
			.cloneNode(true);
	}

	cardInfo() {
		const name = this._name;
		const link = this._link;
		return { name, link }
	}

	likeHandler() {
		this._handleLikeClick();
	}

	_removeButtonHandler() {
		this._handleDeleteClick();
	}

	deleteCard() {
		this._card.remove();
		this._card = null;
	}

	likeOwner() {
		return this._likes.some((like) => {
			return like._id === this._userId;
		});
	}

	setStateLike() {
		this._like.classList.toggle(config.likeButtonActive)
	}

	setCounterLike(likes) {
		this._likes - likes;
		this._likeCounter.textContent = likes.length;
	}

	setEventListeners() {
		this._like.addEvenListener('click', () => {
			this._likeHandler();
		});
		this._deleteButton.addEvenListener('click', () => {
			this._removeButtonHandler();
		});
		this._image.addEvenListener('click', () => {
			this._handleCardClick();
		});
	}

	createNewCard() {
		this._getElement();

		this._cardTitle = this._card.querySelector('.card__heading');
		this._image = this._card.querySelector('.card__image');
		this._like = this._card.querySelector('.card__like');
		this._likesCounter = this._card.querySelector('.card__like-counter');
		this._deleteButton = tis._card.querySelector('.card__trash-icon');

		this._image.src = this._link;
		this._image.alt = this._name;
		this._cardTitle.textContent = this._name;
		this._likesCounter = this._likesCount;

		if (this._ownerId === this.userId) {
			this._deleteButton.style.visibility = 'visible';
		} else {
			this._deleteButton.style.visibility = 'hidden';
		}

		if (this.likeOwner()) {
			this.setStateLike();
		}

		this.setEventListeners();

		return this._card;
	}
}