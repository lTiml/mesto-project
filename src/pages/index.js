import './index.css';

import { profileName, profileJob, profileAvatar, nameInput, jobInput, config, setSubmitButtonState } from '../components/utils.js';
import PopupWithForm from '../components/PopupWithForm';
import Api from '../components/api.js';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage';
import FormValidation from '../components/FormValidation';

const formPopupProfile = document.forms['profile-form'];
const formPopupAdding = document.forms['card-form'];
const formPopupAvatar = document.forms['avatar-form'];
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddSubmitButton = document.querySelector('.popup__button_add');
const buttonSubmitNewAvatar = document.querySelector('.popup__button_new-avatar');
const cardsContainer = document.querySelector('.cards');
const cardContainer = ('.cards');

let userId = null;
let cardList;

const api = new Api({
	baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
	headers: {
		authorization: "adc8e3cc-cb42-435c-8b1d-a7d4774aba24",
		"Content-Type": "application/json",
	}
});

const formAddValidation = new FormValidation(formPopupAdding, config);
formAddValidation.enableValidation();
const formEditValidation = new FormValidation(formPopupProfile, config);
formEditValidation.enableValidation();
const formAvatarValidation = new FormValidation(formPopupAvatar, config);
formAvatarValidation.enableValidation();

// создание эксземпляров класса Popup
// export const popupProfile = new PopupWithForm('.popup-edit');
// export const popupNewCard = new PopupWithForm('.popup-add');
// export const popupEditAvatar = new PopupWithForm('.popup-new-avatar')

// popupProfile.setEventListeners();
// popupNewCard.setEventListeners();
// popupEditAvatar.setEventListeners()

const profileForm = new PopupWithForm('.popup-edit', (inputValues) => {
	const name = nameInput.value;
	const about = jobInput.value;
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });
	api.editProfile({
		name: name,
		about: about
	})
		.then((profileData) => {
			userInfo.editProfile(profileData)
			// popupProfile.close();
		})
		.catch((err) => {
			console.log(`Ошибка в profileForm: ${err}`);
		})
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false });
			profileForm.close();
		});
});
profileForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup__big-image', '.popup__image', '.popup__image-caption');

// const handleCardClick = (card) => {
// 	const cardInfo = card.cardInfo();
// 	popupWithImage.open(cardInfo);
// }

// Создание карточки 
const addCardForm = new PopupWithForm('.popup-add', (inputValues) => {
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });

	// const cardData = {
	// 	name: inputValues.name,
	// 	link: inputValues.link
	// };

	api
	.addCard({
		name: inputValues.name,
		link: inputValues.link,
	})
	.then(data => {
		const card = createCard(data);
		const cardElement = card.createNewCard();
		cardList.prependItem(cardElement);
	})
	.catch(err => console.log(`Ошибка в addNewCard: ${err}`))
	.finally(() => {
		setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false });
		addCardForm.close();
		popupWithImage.close();
	});
});

popupWithImage.setEventListeners();

addCardForm.setEventListeners();

const newAvatar = new PopupWithForm('.popup-new-avatar', (inputValues) => {
	setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохраняем...', disabled: true });
	api.editAvatar({
		avatar: inputValues.avatar
	})
		.then((avatarData) => {
			console.log(avatarData)
			// profileAvatarImage.src = avatarData.avatar
			// не забыдь разобраться почему новый аватар не загружается сразу а только после перезагрузки страници
			userInfo.editAvatar(avatarData)
		})
		.catch(err => console.log(`Ошибка в submitAvatar: ${err}`))
		.finally(() => {
			setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохранить', disabled: false })
			newAvatar.close();
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
			.dislikeCard(card._id)
			.then((data) => {
				card.setCounterLike(data.likes);
				card.setLikeState();
			})
			.catch((error) => console.log(`Ошибка в handleLikeClick: ${error}`))
	} else {
		api
			.likeCard(card._id)
			.then((data) => {
				card.setCounterLike(data.likes);
				card.setLikeState();
			})
			.catch((error) => console.log(`Ошибка в handleLikeClick: ${error}`))
	}
}

const cardsTemplate = '#cards-template';

const createCard = item => {
	const card = new Card(
		item,
		userInfo.id,
		{
			handleCardClick: () => {
				const cardInfo = card.cardInfo();
				popupWithImage.open(cardInfo);
			},
			handleDeleteClick: () => handleDeleteClick(card),
			handleLikeClick: () => handleLikeClick(card),
		}, cardsTemplate);
	return card
}

api
	.dataAll()
	.then((values) => {
		const [userData, cards] = values;
		userInfo.editProfile(userData);
		cardList = new Section(
			{
				items: cards,
				renderer: item => {
					const card = createCard(item);
					const cardElement = card.createNewCard();
					cardList.addItem(cardElement);
				},
			},
			cardContainer
		);
		cardList.renderCards();
		// addStartingCards.renderCards(cards);
	})
	.catch(error => console.log(`Ошибка в index.js api: ${error}`))

// const addStartingCards = new Section(
// 	{
// 		renderer: (card) => {
// 			addCards(card);
// 		},
// 	},
// 	config.cardsContainer
// );

const userInfo = new UserInfo(
	config.profileName,
	config.profileAbout,
	config.profileAvatar
)

api.getUserInfo()
	.then(userData => {
		userInfo.editProfile(userData);

		const profileAvatarImage = document.querySelector('.profile__avatar-image');
		profileAvatarImage.src = userData.avatar;
		userId = userData._id;
	})
	.catch(err => console.log(`Ошибка: ${err}`))

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

// enableValidation(config);

buttonEditProfile.addEventListener('click', () => {
	profileForm.open();
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

function editProfile() {

	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

};

buttonAddNewCard.addEventListener('click', () => {
	addCardForm.open();
});

formPopupProfile.addEventListener('submit', editProfile);

profileAvatar.addEventListener('click', () => {
	newAvatar.open();
});