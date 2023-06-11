import { config } from './utils.js'

const hasInvalidInput = inputList => {
	return inputList.some(input => {
		return !input.validity.valid;
	})
};

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(config.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(config.inactiveButtonClass);
	}
};

const disabledSubmitButton = (formElement) => {
	const button = formElement.querySelector(config.submitButtonSelector);
	button.classList.add(config.inactiveButtonClass);
};

// const resetErr = (formElement) => {
// 	const inputList = formElement.querySelectorAll(config.inputSelector);
	
// 	inputList.forEach((inputElement) => {
// 		inputElement.classList.remove(config.inputErrorClass);
// 		const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
// 		errorElement.textContent = '';
// 	})
// }

const showInputError = (formElement, inputElement, errorMessage) => {
	const { inputErrorClass, errorClass } = config;
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement) => {
	const { inputErrorClass, errorClass } = config;
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
}

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const buttonElement = formElement.querySelector(config.submitButtonSelector);
	
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
};

const isValid = (formElement, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}
	
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault();
		})
		setEventListeners(formElement);
	})
};

export { enableValidation, disabledSubmitButton }