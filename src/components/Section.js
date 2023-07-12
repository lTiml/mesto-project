import { addCards } from '../pages/index.js';

export default class Section {
	constructor({ renderer }, container) {
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	renderCards(cards) {
		cards.forEach(card => {
			addCards(card);
		})
	}

	addItem(element) {
		this._container.prepend(element);
	}
};