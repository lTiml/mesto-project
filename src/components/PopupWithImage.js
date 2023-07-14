import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageElement, captionElement) {
        super(popupSelector);
        this.imageElement = this.popupElement.querySelector(imageElement);
        this.captionElement = this.popupElement.querySelector(captionElement);
    }

    open({ name, link }) {
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent = name;
        super.open();
    }
}