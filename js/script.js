const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const closePopupButton = document.querySelectorAll('.popup__close-button');
const popupSubmitButtons = document.querySelectorAll('.popup__button')
const imagePopup = document.querySelector('.popup__big-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__caption');

// Открытие/Закрытие попап окон

function openPopup (btn, element) {
	btn.addEventListener('click', () => {
		element.classList.add('popup_opened');
	});
};
function closePopup (btn, element) {
	btn.forEach((item) => {
		item.addEventListener('click', () => {
			element.classList.remove('popup_opened');
		});
	});
};

openPopup(editButton, editPopup);
openPopup(addButton, addPopup);
closePopup(closePopupButton, editPopup);
closePopup(closePopupButton, addPopup);
closePopup(closePopupButton, imagePopup);


// Поля формы

const popupEditForm = document.querySelector('.popup__editForm');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_status');

nameInput.placeholder = profileName.textContent;
jobInput.placeholder = profileJob.textContent;

// Редактирования имени и информации о себе

const editPopupForm = document.querySelector('.popup__editForm');

function formSubmitHandler (evt) {
	
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
}

editPopupForm.addEventListener('submit', formSubmitHandler);
closePopup(popupSubmitButtons, editPopup);


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

const cardsContainer = document.querySelector('.cards');

function cardsBody(arr) {

	arr.forEach((item) => {
		const cardsTemplate = document.querySelector('#cards-template').content;
		const card = cardsTemplate.querySelector('.card').cloneNode(true);

		card.querySelector('.card__image').src = item.link;
		card.querySelector('.card__image').alt = item.name;
		card.querySelector('.card__heading').textContent = item.name;

		cardsContainer.append(card);
	});
	deleteCard();
};
cardsBody(initialCards);

// Добавление карточки

const addPopupForm = document.querySelector('.popup__addForm');

function newCard(evt) {
	evt.preventDefault();
	const cardsTemplate = document.querySelector('#cards-template').content;
	const card = cardsTemplate.querySelector('.card').cloneNode(true);
	const inputPlace = document.querySelector('.popup__input_type_place');
	const inputUrl = document.querySelector('.popup__input_type_url');

	card.querySelector('.card__image').src = inputUrl.value;
	card.querySelector('.card__image').alt = inputPlace.value;
	card.querySelector('.card__heading').textContent = inputPlace.value;

	cardsContainer.prepend(card);
	likeCard();
	popupImage();
	deleteCard();
}
addPopupForm.addEventListener('submit', newCard);

// Лайк карточки

function likeCard() {
	const likeButton = document.querySelectorAll('.card__like');

	likeButton.forEach((item) => {
		item.addEventListener('click', () => {
			item.classList.toggle('card__like_active');
		});
	})
}
likeCard();


// Удаление карточки
function deleteCard() {
	const deleteButton = document.querySelectorAll('.card__trash-icon');

	deleteButton.forEach((item) => {
		item.addEventListener('click', () => {
			const closestCard = item.closest('.card');

			closestCard.remove();
		})
	})
};

// Попап картинок

function popupImage() {
	const images = document.querySelectorAll('.card__image');
	const imageOrigin = imagePopup.querySelector('.popup__image');
	const imageCaption = imagePopup.querySelector('.popup__image-caption');

	images.forEach((item) => {
		item.addEventListener('click', () => {
			imagePopup.classList.add('popup_opened');
			imageOrigin.src = item.src;
			imageOrigin.alt = item.alt;
			imageCaption.textContent = item.alt;
		});
	});
};
popupImage();