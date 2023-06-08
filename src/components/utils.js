function openPopup (popup) {
	popup.classList.add('popup_opened');
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
};

function closePopupOnEscape(popup) {
	document.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			closePopup(popup)
		}
	});
};

function closePopupOnMouseoutClick(popup) {
	popup.addEventListener('click', e => {
		if (e.target === popup) {
			closePopup(popup)
		}
	})
}

export { openPopup, closePopup, closePopupOnEscape, closePopupOnMouseoutClick };