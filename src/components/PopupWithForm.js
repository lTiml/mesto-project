import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this.formSubmitHandler = formSubmitHandler;
        this.form = this.popupElement.querySelector('form');
    }

    _getInputValues() {
        this.inputList = this.form.querySelectorAll('.popup__input');
        this.formValues = {};
        this.inputList.forEach(input => {
            this.formValues[input.name] = input.value;
        });

        return this.formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.formSubmitHandler(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this.form.reset()
    }
}