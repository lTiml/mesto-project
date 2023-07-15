export default class Section {
	constructor({ items, renderer }, container) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	// renderCards(cards) {
	// 	cards.forEach(card => {
	// 		addCards(card);
	// 	})
	// }
	renderCards() {
		this._items.forEach(card => {
			this._renderer(card)
		})
	}

	addItem(element) {
		this._container.append(element);
	}
};