import './index.css';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, disabledSubmitButton } from '../components/validate.js';
import { renderCards, watchingLikesState, removeCard } from '../components/card.js';
import { editPopup, profileName, profileJob, profileAvatar, profileAvatarImage, nameInput, jobInput, config, setSubmitButtonState, inputPlace, inputUrl, inputAvatarUrl } from '../components/utils.js';
import { userInfo, getCards, apiEditProfile, addCards, editAvatar, deleteCard, toggleLikeState } from '../components/api.js';
import { Popup } from '../components/Popup.js'

const formPopupProfile = document.forms['profile-form'];
const formPopupAdding = document.forms['card-form'];
const formPopupAvatar = document.forms['avatar-form'];
const popupNewAvatar = document.querySelector('.popup-new-avatar');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddSubmitButton = document.querySelector('.popup__button_add');
const addPopup = document.querySelector('.popup-add');
const closePopupButtons = document.querySelectorAll('.popup__close');

const buttonSubmitNewAvatar = document.querySelector('.popup__button_new-avatar');
const buttonSubmitEditProfile = document.querySelector('.popup__button-edit-profile');
const cardsContainer = document.querySelector('.cards');

// создание эксземпляров класса Popup
const popupProfile = new Popup('.popup-edit');
const popupNewCard = new Popup('.popup-add');
const popupAvatarEdit = new Popup('.popup-new-avatar');

let userId = null;

buttonEditProfile.addEventListener('click', () => {
	// openPopup(editPopup);
	popupProfile.open();
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

function editProfile() {

	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	closePopup(editPopup);
};

buttonAddNewCard.addEventListener('click', () => {
	// openPopup(addPopup);
	popupNewCard.open();
	disabledSubmitButton(addPopup)
});

formPopupProfile.addEventListener('submit', editProfile);

closePopupButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
});

profileAvatar.addEventListener('click', () => {
	// openPopup(popupNewAvatar);
	popupAvatarEdit.open()
	disabledSubmitButton(popupNewAvatar)
});

const setUserInfo = user => {
	nameInput.textContent = user.name;
	jobInput.textContent = user.about;
	profileAvatarImage.src = user.avatar;
	userId = user._id;
};

const getInfo = () => {
	return Promise.all([userInfo(), getCards()]);
};
getInfo()
	.then(([user, initialCards]) => {
		setUserInfo(user)

		initialCards.forEach(data => {
			renderCards(cardsContainer, data, userId);
		})
	})
	.catch(err => console.log(`Ошибка в getInfo: ${err}`))

const submitAvatar = evt => {
	evt.preventDefault();
	setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохраняем...', disabled: true });
	editAvatar({ avatar: inputAvatarUrl.value })
		.then(data => {
			profileAvatarImage.src = data.avatar;
			closePopup(popupNewAvatar);
			evt.target.reset();
		})
		.catch(err => console.log(`Ошибка в submitAvatar: ${err}`))
		.finally(() => { setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохранить', disabled: false }) })
};

const addNewCard = evt => {
	evt.preventDefault();
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });
	addCards({
		name: inputPlace.value,
		link: inputUrl.value,
	})
		.then(serverData => {
			renderCards(cardsContainer, serverData, userId);
			closePopup(addPopup);
			evt.target.reset();
		})
		.catch(err => console.log(`Ошибка в addNewCard: ${err}`))
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false })
		})
};

const handleProfile = evt => {
	evt.preventDefault();
	setSubmitButtonState({ button: buttonSubmitEditProfile, text: 'Сохраняем...', disabled: true })
	apiEditProfile({
		name: nameInput.value,
		about: jobInput.value,
	})
		.then(data => {
			profileName.textContent = data.name;
			profileJob.textContent = data.about;
			closePopup(editPopup);
		})
		.catch(err => console.log(`Ошибка в handleProfile: ${err}`))
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false })
		})
};

formPopupProfile.addEventListener('submit', handleProfile);
formPopupAdding.addEventListener('submit', addNewCard);
formPopupAvatar.addEventListener('submit', submitAvatar);

const handleWatchingLikesState = (cardId, isLiked, cardElement) => {
	toggleLikeState(cardId, isLiked)
		.then(serverData => {
			watchingLikesState(cardElement, serverData.likes, userId);
		})
		.catch(err => console.log(`Ошибка в handleWatchingLikesState: ${err}`));
};

const handleDeleteCard = (cardId, cardElement) => {
	deleteCard(cardId)
		.then(() => {
			removeCard(cardElement);
		})
		.catch(err => console.log(`Ошибка в handleDeleteCard: ${err}`))
};

enableValidation(config);

export { cardsContainer, handleWatchingLikesState, handleDeleteCard };

