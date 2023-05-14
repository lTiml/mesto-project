const editProfileForm = document.forms['profile-form'];
const addPopupForm = document.forms['card-form'];
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const closePopupButtons = document.querySelectorAll('.popup__close');
const popupSubmitButtons = document.querySelectorAll('.popup__button');
const imagePopup = document.querySelector('.popup__big-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__caption');
const popupEditForm = document.querySelector('.popup__editForm');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_status');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.cards');

// Открытие/Закрытие попап окон & поля формы формы профиля

function openPopup (popup) {
	popup.classList.add('popup_opened');
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
};

closePopupButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
});

editProfileButton.addEventListener('click', () => {
	openPopup(editPopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});
addNewCardButton.addEventListener('click', () => openPopup(addPopup));

// Редактирования имени и информации о себе

function editProfile (evt) {
	
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
};

editProfileForm.addEventListener('submit', editProfile);

// Закрываем попап при нажатии на кнопку Submit

popupSubmitButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
})

// Шесть карточек из коробки

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

function createCard(item) {
	const cardsTemplate = document.querySelector('#cards-template').content;
	const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
	const cardElementImage = cardElement.querySelector('.card__image');
	const cardElementHeading = cardElement.querySelector('.card__heading');
	const cardPopupImage = document.querySelector('.popup__image');
	const cardPopupCaption = document.querySelector('.popup__image-caption');

	cardElementImage.src = item.link;
	cardElementImage.alt = item.name;
	cardElementHeading.textContent = item.name;

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

initialCards.forEach((item) => {
	const card = createCard(item);
	cardsContainer.append(card);
});

addPopupForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	item = {
		name: inputPlace.value,
		link: inputUrl.value,
	}
	item = createCard(item);

	cardsContainer.prepend(item);
});