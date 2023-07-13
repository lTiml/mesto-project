import { config } from './utils.js';

export default class Card {
	constructor(data, userId, { handleCardClick, handleDeleteClick, handleLikeClick }, cardsTemplate) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._likesCount = data.likes.length;
		this._id = data._id;
		this._ownerId = data.owner._id
		this._cardsTemplate = cardsTemplate;
		this._userId = userId;

		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
	}

	_getElement() {
		this._card = document
			.querySelector(this._cardsTemplate)
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

	isLiked() {
		return this._likes.some((like) => {
			return like._id === this._userId;
		});
	}

	setLikeState() {
		this._like.classList.toggle(config.likeButtonActive)
	}

	setCounterLike(likes) {
		this._likes = likes;
		this._likeCounter.textContent = likes.length;
	}

	setEventListeners() {
		this._like.addEventListener('click', () => {
			this._likeHandler();
		});
		this._deleteButton.addEventListener('click', () => {
			this._removeButtonHandler();
		});
		this._image.addEventListener('click', () => {
			this._handleCardClick();
		});
	}
	
	createNewCard() {
		this._getElement();

		this._cardTitle = this._card.querySelector('.card__heading');
		this._image = this._card.querySelector('.card__image');
		this._like = this._card.querySelector('.card__like');
		this._likesCounter = this._card.querySelector('.card__like-counter');
		this._deleteButton = this._card.querySelector('.card__trash-icon');

		this._image.src = this._link;
		this._image.alt = this._name;
		this._cardTitle.textContent = this._name;
		this._likesCounter = this._likesCount;

		if (this._ownerId === this._userId) {
			this._deleteButton.style.visibility = 'visible';
		} else {
			this._deleteButton.style.visibility = 'hidden';
		}

		if (this.isLiked()) {
			this.setLikeState();
		}

		this.setEventListeners();

		return this._card;
	}
}