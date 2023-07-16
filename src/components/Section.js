export default class Section {
	constructor({ items, renderer }, container) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}
	
	renderCards() {
		this._items.forEach(card => {
			this._renderer(card)
		})
	}
	
	prependItem(item) {
		this._container.prepend(item)
	}

	addItem(item) {
		this._container.append(item);
	}
};