// import { closePopupByEsc } from "./modal";

export class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    // открытие попапа
    open() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)

    }
    // закрытие попапа
    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    // метод закрытия попапа при нажатии Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
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