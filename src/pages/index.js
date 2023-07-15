import './index.css';

import { profileAvatar, nameInput, jobInput, config, setSubmitButtonState } from '../components/utils.js';
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
const cardsTemplate = '#cards-template';

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

const profileForm = new PopupWithForm('.popup-edit', (inputValues) => {
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });
	api.editProfile({
		name: inputValues.name,
		about: inputValues.position
	})
		.then((profileData) => {
			userInfo.editProfile(profileData)
			profileForm.close();
		})
		.catch((err) => {
			console.log(`Ошибка в profileForm: `, err);
			console.log(`Ошибка в profileForm: ${err}`);
		})
		.finally(() => {
			setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохранить', disabled: false });
		});
});
profileForm.setEventListeners();


const popupWithImage = new PopupWithImage('.popup__big-image', '.popup__image', '.popup__image-caption');

// Создание карточки 
const addCardForm = new PopupWithForm('.popup-add', (inputValues) => {
	setSubmitButtonState({ button: popupAddSubmitButton, text: 'Сохраняем...', disabled: true });

	api 
	.addCard({
		name: inputValues.name,
		link: inputValues.link
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
	})
});

popupWithImage.setEventListeners();

addCardForm.setEventListeners();

const newAvatar = new PopupWithForm('.popup-new-avatar', (inputValues) => {
	setSubmitButtonState({ button: buttonSubmitNewAvatar, text: 'Сохраняем...', disabled: true });
	api.editAvatar({
		avatar: inputValues.avatar
	})
		.then((avatarData) => {
			userInfo.editAvatar(avatarData)
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
	})
	.catch(error => console.log(`Ошибка в index.js api: ${error}`))

const userInfo = new UserInfo(
	config.profileName,
	config.profileAbout,
	config.profileAvatar
)

buttonEditProfile.addEventListener('click', () => {
	profileForm.open();
	const userData = userInfo.getUser();
	nameInput.value = userData.name;
	jobInput.value = userData.about;

});

buttonAddNewCard.addEventListener('click', () => {
	addCardForm.open();
});


profileAvatar.addEventListener('click', () => {
	newAvatar.open();
});