import { config } from './utils.js';

export default class FormValidation {
	constructor(form, config) {
		this._formElement = form;
		this._config = config;
	};

	_errorMessage(input) {
		return this._formElement.querySelector(`.${input.id}-error`);
	};

	_error(input, message) {
		const errorElement = this._errorMessage(input);
		input.classList.add(this._config.inputErrorClass);
		errorElement.textContent = message;
		errorElement.classList.add(this._config.errorClass);
	}

	_hideError(input) {
		const errorElement = this._errorMessage(input);
		errorElement.classList.remove(this._config.errorClass);
		input.classList.remove(this._config.inputErrorClass);
		errorElement.textContent = '';
	};

	_checkValidity(input) {
		const errorElement = this._errorMessage(input);
		if (input.validity.patternMismatch) {
			input.setCustomValidity(input.dataset.errorMessage);
		} else {
			input.setCustomValidity('');
		}

		if (!input.validity.valid) {
			this._error(input, input.validationMessage, errorElement);
		} else {
			this._hideError(input, errorElement);
		}
	};

	_invalidInput() {
		return this._inputList.some(input => {
			return !input.validity.valid;
		});
	};

	_toggleButtonState() {
		if (this._invalidInput(this._inputList)) {
			this._button.classList.add(this._config.inactiveButtonClass);
			this._button.setAttribute('disabled', true);
		} else {
			this._button.classList.remove(this._config.inactiveButtonClass);
			this._button.removeAttribute('disabled', true);
		}
	}

	_checkInputs(evt) {
		const input = evt.target;
		this._checkValidity(input);
		this._toggleButtonState();
	};

	disableSubmitButtons() {
		this._button.setAttribute('disabled', true);
		this._button.classList.add(this._config.inactiveButtonClass);
	}

	_deleteErrorMessage() {
		this._inputList.forEach(element => {
			element.classList.remove(this._config.inputErrorClass);
		});
		this._errorList = Array.from(this._formElement.querySelectorAll(`${this._config.inputSelector}-error`));
		this._errorList.forEach(element => {
			element.textContent = '';
			element.classList.remove(this._config.errorClass);
		})
	}

	_addEventListeners(form) {
		this._inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
		this._button = form.querySelector(this._config.submitButtonSelector);

		this._formElement.addEventListener('reset', () => {
			this._deleteErrorMessage();
		});
		this._toggleButtonState();
		this._inputList.forEach(input => {
			input.addEventListener('input', (evt) => {
				this._checkInputs(evt);
			})
		})
	}

	enableValidation() {
		this._addEventListeners(this._formElement);
	}
}