const editPopup = document.querySelector('.popup-edit');
const imagePopup = document.querySelector('.popup__big-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__caption');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarImage = document.querySelector('.profile__avatar-image');
const formEditPopup = document.querySelector('.popup__editForm');
const nameInput = formEditPopup.querySelector('.popup__input_type_name');
const jobInput = formEditPopup.querySelector('.popup__input_type_status');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardPopupImage = document.querySelector('.popup__image');
const cardPopupCaption = document.querySelector('.popup__image-caption');
const inputAvatarUrl = document.querySelector('.popup__input_type_avatar_url');

const config = ({
	formSelector: '.popup__form',
	inputSelector: '.popup__input ',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
	likeButtonActive: 'card__like_active',
});

const serverConfig = {
	url: "https://nomoreparties.co/v1/plus-cohort-25",
	headers: {
		authorization: "adc8e3cc-cb42-435c-8b1d-a7d4774aba24",
		"Content-Type": "application/json",
	}
};

const setSubmitButtonState = ({button, text, disabled}) => {
	if (disabled) {
		button.disabled = 'disabled';
	} else {
		button.disabled = false;
	}

	button.textContent = text;
};

export { setSubmitButtonState, editPopup, imagePopup, profileName, profileJob, profileAvatar, nameInput, jobInput, cardPopupImage, cardPopupCaption, config, serverConfig, profileAvatarImage, inputPlace, inputUrl, inputAvatarUrl }