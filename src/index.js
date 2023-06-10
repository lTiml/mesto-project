import './pages/index.css';
import { openPopup, closePopup, closePopupByEsc } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { initialCards, createCard } from './components/card.js';
import { editPopup, profileName, profileJob, nameInput, jobInput, config } from './components/utils.js';

const formPopupProfile = document.forms['profile-form'];
const formPopupAdding = document.forms['card-form'];
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup-add');
const closePopupButtons = document.querySelectorAll('.popup__close');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.cards');

buttonEditProfile.addEventListener('click', () => {
	openPopup(editPopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
	document.addEventListener('keydown', closePopupByEsc(editPopup))
});

function editProfile() {
	
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	closePopup(editPopup);
};

buttonAddNewCard.addEventListener('click', () => openPopup(addPopup));

formPopupProfile.addEventListener('submit', editProfile);

closePopupButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
});

initialCards.forEach((item) => {
	const card = createCard(item.name, item.link);
	cardsContainer.append(card);
});

formPopupAdding.addEventListener('submit', (evt) => {
	cardsContainer.prepend(createCard(inputPlace.value, inputUrl.value));
	evt.target.reset();
	closePopup(addPopup);
});

enableValidation(config);