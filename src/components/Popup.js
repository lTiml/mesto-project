export class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    open() {
        this.popupElement.classList.add('popup_opened');
        // document.addEventListener('keydown', closePopupOnEsc);
    }
    close() {
        this.popupElement.classList.remove('popup_opened');
        // document.addEventListener('keydown', closePopupOnEsc);
    }
    // _handleEscClose(evt) {
    //     if (evt.key === 'Escape') {
    //     this.popupElement
    //     }
    // }
    setEventListeners() {
    this.popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        this.close(this.popupElement);
    };
    if (evt.target.classList.contains('popup__close-button')) {
        evt.preventDefault();
        this.close(this.popupElement);
    };
})
    }
}