import { openPopup, closePopup, closePopupOnEscape, closePopupOnMouseoutClick } from './components/utils.js';
import { enableValidation } from './components/validate.js';
import { editProfile } from './components/modal.js';
import { initialCards, createCard } from './components/card.js';

const editProfileForm = document.forms['profile-form'];
const addPopupForm = document.forms['card-form'];
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
export const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const closePopupButtons = document.querySelectorAll('.popup__close');
export const imagePopup = document.querySelector('.popup__big-image');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__caption');
const popupEditForm = document.querySelector('.popup__editForm');
export const nameInput = popupEditForm.querySelector('.popup__input_type_name');
export const jobInput = popupEditForm.querySelector('.popup__input_type_status');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

const cardsContainer = document.querySelector('.cards');

const config = ({
	formSelector: '.popup__form',
	inputSelector: '.popup__input ',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
});

editProfileButton.addEventListener('click', () => {
	openPopup(editPopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

addNewCardButton.addEventListener('click', () => openPopup(addPopup));

editProfileForm.addEventListener('submit', editProfile);

closePopupButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
});

initialCards.forEach((item) => {
	const card = createCard(item.name, item.link);
	cardsContainer.append(card);
});

addPopupForm.addEventListener('submit', (evt) => {
	cardsContainer.prepend(createCard(inputPlace.value, inputUrl.value));
	evt.target.reset();
	closePopup(addPopup);
});

closePopupOnEscape(editPopup);
closePopupOnEscape(addPopup);
closePopupOnEscape(imagePopup);

closePopupOnMouseoutClick(editPopup);
closePopupOnMouseoutClick(addPopup);
closePopupOnMouseoutClick(imagePopup);

enableValidation(config);