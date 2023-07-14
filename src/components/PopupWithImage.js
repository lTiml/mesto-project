import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageElement, captionElement) {
        super(popupSelector);
        this.imageElement = this.popupElement.querySelector(imageElement);
        this.captionElement = this.popupElement.querySelector(captionElement);
    }

    open(cardData) {
        this.imageElement.src = cardData.link;
        this.imageElement.alt = cardData.name;
        this.captionElement.textContent = cardData.name;
        super.open();
    }

}