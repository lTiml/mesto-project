import './index.css';

import { enableValidation, disabledSubmitButton } from '../components/validate.js';
import { editPopup, imagePopup, profileName, profileJob, profileAvatar, profileAvatarImage, nameInput, jobInput, config, setSubmitButtonState, inputPlace, inputUrl, inputAvatarUrl } from '../components/utils.js';
// import { userInfo } from '../components/api.js';
// import { Popup } from '../components/Popup.js'
import Popup from '../components/Popup'
import PopupWithForm from '../components/PopupWithForm';
import Api from '../components/api.js';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage';

const formPopupProfile = document.forms['profile-form'];
const formPopupAdding = document.forms['card-form'];
const formPopupAvatar = document.forms['avatar-form'];
const popupNewAvatar = document.querySelector('.popup-new-avatar');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddSubmitButton = document.querySelector('.popup__button_add');
const addPopup = document.querySelector('.popup-add');
// const closePopupButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form')
const buttonSubmitNewAvatar = document.querySelector('.popup__button_new-avatar');
const buttonSubmitEditProfile = document.querySelector('.popup__button-edit-profile');
const cardsContainer = document.querySelector('.cards');

const api = new Api({
	baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
	headers: {
		authorization: "adc8e3cc-cb42-435c-8b1d-a7d4774aba24",
		"Content-Type": "application/json",
	}
});


// создание эксземпляров класса Popup
export const popupProfile = new Popup('.popup-edit');
export const popupNewCard = new Popup('.popup-add');
export const popupEditAvatar = new Popup('.popup-new-avatar')
popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupEditAvatar.setEventListeners()

const profileForm = new PopupWithForm('.popup-edit', (inputValues) => {
	const name = nameInput.value;
	const about = jobInput.value;
	console.log({ name, about });
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });
	api.editProfile({
		// name: inputValues.name,
		// about: inputValues.position
		name: name,
		about: about
	})
		.then((profileData) => {
			// profileName.textContent = profileData.name;
			// profileJob.textContent = profileData.about;
			userInfo.editProfile(profileData)
			popupProfile.close();
		})
		.catch((err) => {
			console.log(`Ошибка в profileForm: ${err}`);
		})
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false });
			popupProfile.close();
		});
});
profileForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup__big-image', '.popup__image', '.popup__image-caption');

const addCardForm = new PopupWithForm('.popup-add', (inputValues) => {
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });

	const cardData = {
		name: inputValues.name,
		link: inputValues.link
	};
	function handleCardClick(cardData) {

		popupWithImage.open(cardData);
	}
	api.addCard(cardData)
		.then(serverData => {
			const card = new Card(serverData, userId, {
				handleCardClick: handleCardClick,
			}, '#cards-template');

			const cardElement = card.createNewCard();
			cardsContainer.prepend(cardElement);

			popupNewCard.close();
			addCardForm.close();
			popupWithImage.close();
		})
		.catch(err => console.log(`Ошибка в addNewCard: ${err}`))
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false });
		});
});

popupWithImage.setEventListeners();
addCardForm.setEventListeners();

const section = new Section({ renderer: addCards }, '.cards');


const newAvatar = new PopupWithForm('.popup-new-avatar', (inputValues) => {
	setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохраняем...', disabled: true });
	api.editAvatar({
		avatar: inputValues.avatar
	})
		.then((avatarData) => {
			profileAvatarImage.src = avatarData.avatar
			newAvatar.close();

		})
		.catch(err => console.log(`Ошибка в submitAvatar: ${err}`))
		.finally(() => {
			setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохранить', disabled: false })
		});
});
newAvatar.setEventListeners();

const handleDeleteClick = (card) => {
	api
		.deleteCard(card._id)
		.then(() => {
			card.deleteCard();
		})
		.catch((error) => console.log(`Ошибка в handleDeleteClick: ${error}`))
};

const handleLikeClick = (card) => {
	if (card.isLiked()) {
		api
			.dislikeCard(card)
			.then((data) => {
				card.setCounterLike(data.likes);
				card.setLikeState();
			})
			.catch((error) => console.log(`Ошибка в handleLikeClick: ${error}`))
	} else {
		api
			.likeCard(card)
			.then((data) => {
				card.setCounterLike(data.likes);
				card.setLikeState();
			})
			.catch((error) => console.log(`Ошибка в handleLikeClick: ${error}`))
	}
}
const cardsTemplate = '#cards-template';
const createCard = (dataCard) => {
	const card = new Card(
		dataCard,
		userInfo.id,
		{
			handleCardClick: () => {
				const cardInfo = card.cardInfo();
				popupWithImage.open(cardInfo);
			},
			handleDeleteClick: () => handleDeleteClick(card),
			handleLikeClick: () => handleLikeClick(card),
		},
		cardsTemplate
	);

	return card;
}

export const addCards = (dataCard) => {
	const card = createCard(dataCard);
	const cardNode = card.createNewCard();
	addStartingCards.addItem(cardNode);
}

// const cardContainer = '.cards';
api
	.dataAll()
	.then((values) => {
		const [userData, cards] = values;
		userInfo.editProfile(userData);
		addStartingCards.renderCards(cards);
	})
	.catch(error => console.log(`Ошибка в index.js api: ${error}`))

const addStartingCards = new Section(
	{
		renderer: (card) => {
			addCards(card);
		},
	},
	config.cardsContainer
);

const userInfo = new UserInfo(
	config.profileName,
	config.profileAbout,
	config.profileAvatar
)

// const name = formElement.querySelector('#name-input').value;
// const about = formElement.querySelector('#job-input').value;

// const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__caption' }, api);

// api.getUserInfo()
//     .then((userData) => {
//         userInfo.setUserInfo(userData);

//         // Обновляем аватар пользователя
//         const profileAvatarImage = document.querySelector('.profile__avatar-image');
//         profileAvatarImage.src = userData.avatar;
//     })
//     .catch((err) => {
//         console.log(`Ошибка при получении информации о пользователе: ${err}`);
//     });

api.getUserInfo()
	.then(userData => {
		userInfo.editProfile(userData);

		const profileAvatarImage = document.querySelector('.profile__avatar-image');
		profileAvatarImage.src = userData.avatar;
		userId = userData._id;
	})
	.catch(err => console.log(`Ошибка: ${err}`))


// formElement.addEventListener('submit', function (event) {
// 	event.preventDefault();


// 	console.log({ name, about });

// 	userInfo.setUserInfo({ name, about })
// 		.then((userData) => {

// 			profileName.textContent = userData.name;
// 			profileJob.textContent = userData.about;
// 		})
// 		.catch((err) => {
// 			console.log(`Ошибка при обновлении информации о пользователе: ${err}`);
// 		});
// });




// const submitAvatar = evt => {
// 	evt.preventDefault();
// 	setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохраняем...', disabled: true });
// 	editAvatar({ avatar: inputAvatarUrl.value })
// 		.then(data => {
// 			profileAvatarImage.src = data.avatar;
// 			// closePopup(popupNewAvatar);
// 			popupEditAvatar.close();
// 			evt.target.reset();
// 		})
// 		.catch(err => console.log(`Ошибка в submitAvatar: ${err}`))
// 		.finally(() => { setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохранить', disabled: false }) })
// };

// const addNewCard = evt => {
// 	evt.preventDefault();
// 	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });
// 	addCards({
// 		name: inputPlace.value,
// 		link: inputUrl.value,
// 	})
// 		.then(serverData => {
// 			renderCards(cardsContainer, serverData, userId);
// 			// closePopup(addPopup);
// 			popupNewCard.close();
// 			evt.target.reset();
// 		})
// 		.catch(err => console.log(`Ошибка в addNewCard: ${err}`))
// 		.finally(() => {
// 			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false })
// 		})
// };

// const handleProfile = evt => {
// 	evt.preventDefault();
// 	setSubmitButtonState({ button: buttonSubmitEditProfile, text: 'Сохраняем...', disabled: true })
// 	apiEditProfile({
// 		name: nameInput.value,
// 		about: jobInput.value,
// 	})
// 		.then(data => {
// 			profileName.textContent = data.name;
// 			profileJob.textContent = data.about;
// 			popupProfile.close();
// 		})
// 		.catch(err => console.log(`Ошибка в handleProfile: ${err}`))
// 		.finally(() => {
// 			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false })
// 		})
// };

// formPopupProfile.addEventListener('submit', handleProfile);
// formPopupAdding.addEventListener('submit', addNewCard);
// formPopupAvatar.addEventListener('submit', submitAvatar);

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

// enableValidation(config);g


let userId = null;

buttonEditProfile.addEventListener('click', () => {
	// openPopup(editPopup);
	// popupProfile.open();
	popupProfile.open();
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

function editProfile() {

	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	// popupProfile.close();
	// closePopup(editPopup);
};

buttonAddNewCard.addEventListener('click', () => {
	// openPopup(addPopup);
	popupNewCard.open();
	// disabledSubmitButton(addPopup)
});

formPopupProfile.addEventListener('submit', editProfile);

// closePopupButtons.forEach((button) => {
// 	const popup = button.closest('.popup');
// 	button.addEventListener('click', () => closePopup(popup))
// });

profileAvatar.addEventListener('click', () => {
	// openPopup(popupNewAvatar);
	popupEditAvatar.open();
	// disabledSubmitButton(popupNewAvatar)
});

// const setUserInfo = user => {
// 	nameInput.textContent = user.name;
// 	jobInput.textContent = user.about;
// 	profileAvatarImage.src = user.avatar;
// 	userId = user._id;
// };

// const getInfo = () => {
// 	return Promise.all([userInfo(), getCards()]);
// };
// getInfo()
// 	.then(([user, initialCards]) => {
// 		setUserInfo(user)

// 		initialCards.forEach(data => {
// 			renderCards(cardsContainer, data, userId);
// 		})
// 	})
// 	.catch(err => console.log(`Ошибка в getInfo: ${err}`))
export { /* cardsContainer, */ handleWatchingLikesState, handleDeleteCard };

