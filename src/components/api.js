export default class Api {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this.headers = options.headers;
	}

	onRes(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}

	_request(url, options) {
		return fetch(`${this.baseUrl}${url}`, options)
			.then(this.onRes)
	}

	getInitialCards() {
		return this._request(`/cards`, {
			headers: this.headers
		})
	}

	getUserInfo() {
		return this._request(`/users/me`, {
			headers: this.headers
		})
	}

	editProfile(data) {
		return this._request(`/users/me`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify(data)
		})
		// .then(this.onRes);
	}

	addCard(data) {
		return this._request(`/cards`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(data)
		})
		// .then(this.onRes);
	}

	deleteCard(cardId) {
		return this._request(`/cards/${cardId}`, {
			method: "DELETE",
			headers: this.headers
		})
		// .then(this.onRes);
	}

	likeCard(cardId) {
		return this._request(`/cards/likes/${cardId}`, {
			method: "PUT",
			headers: this.headers
		})
		// .then(this.onRes);
	}

	dislikeCard(cardId) {
		return this._request(`/cards/likes/${cardId}`, {
			method: "DELETE",
			headers: this.headers
		})
		// .then(this.onRes);
	}

	editAvatar(data) {
		return this._request(`/users/me/avatar`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify(data)
		})
		// .then(this.onRes);
	}

	dataAll() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()])
	}
}