// function openPopup(popup) {
// 	popup.classList.add('popup_opened');
// 	document.addEventListener('keydown', closePopupByEsc);
// 	popup.addEventListener('click', closePopupOnMouseoutClick);
// };

// function closePopup(popup) {
// 	popup.classList.remove('popup_opened');
// 	document.removeEventListener('keydown', closePopupByEsc);
// 	popup.removeEventListener('click', closePopupOnMouseoutClick);
// };

// // // const closePopupByEsc = (evt) => {
// // 	if (evt.key === 'Escape') {
// // 		const openedPopup = document.querySelector('.popup_opened');
// // 		closePopup(openedPopup)
// // 	}
// // };

// function closePopupOnMouseoutClick(evt) {
// 	const openedPopup = document.querySelector('.popup_opened');
// 	if (evt.target === openedPopup) {
// 		closePopup(openedPopup)
// 	}
// };

// export { openPopup, closePopup, closePopupOnMouseoutClick };