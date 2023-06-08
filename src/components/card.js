import { imagePopup } from "../index";

const cardPopupImage = document.querySelector('.popup__image');
const cardPopupCaption = document.querySelector('.popup__image-caption');

const initialCards = [
	{
		name: 'Майами',
		link: 'https://images.unsplash.com/photo-1597535973747-951442d5dbc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80'
	},
	{
		name: 'Нью-Йорк',
		link: 'https://images.unsplash.com/photo-1576157792381-1301f25b960d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Гавайи',
		link: 'https://images.unsplash.com/photo-1603998086701-ced9802e52c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

function createCard(placeName, placeLink) {
	const cardsTemplate = document.querySelector('#cards-template').content;
	const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
	const cardElementImage = cardElement.querySelector('.card__image');
	const cardElementHeading = cardElement.querySelector('.card__heading');

	cardElementImage.src = placeLink;
	cardElementImage.alt = placeName;
	cardElementHeading.textContent = placeName;

	cardElement.querySelector('.card__like').addEventListener('click', (event) => {event.target.classList.toggle('card__like_active')});
	cardElement.querySelector('.card__trash-icon').addEventListener('click', (event) => {event.target.closest('.card').remove()});
	cardElementImage.addEventListener('click', () => {
		openPopup(imagePopup);
		cardPopupImage.src = cardElementImage.src;
		cardPopupImage.alt = cardElementImage.alt;
		cardPopupCaption.textContent = cardElementImage.alt;
	});

	return cardElement;
};

export { initialCards, createCard }