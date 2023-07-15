import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this.formSubmitHandler = formSubmitHandler;
        this.form = this.popupElement.querySelector('form');
        this.inputList = this.form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
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
            // this.close();
        });
    }

    close() {
        super.close();
        this.form.reset()
    }
}