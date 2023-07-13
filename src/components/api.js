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

	getInitialCards() {
		return fetch(`${this.baseUrl}/cards`, {
			headers: this.headers
		})
			.then(this.onRes);
	}

	getUserInfo() {
		return fetch(`${this.baseUrl}/users/me`, {
			headers: this.headers
		})
			.then(this.onRes);
	}

	editProfile(data) {
		return fetch(`${this.baseUrl}/users/me`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify(data)
		})
			.then(this.onRes);
	}

	addCard(data) {
		return fetch(`${this.baseUrl}/cards`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(data)
		})
			.then(this.onRes);
	}

	deleteCard(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this.headers
		})
			.then(this.onRes);
	}

	likeCard(data) {
		return fetch(`${this.baseUrl}/cards/likes/${data._id}`, {
			method: "PUT",
			headers: this.headers
		})
			.then(this.onRes);
	}

	dislikeCard(data) {
		return fetch(`${this.baseUrl}/cards/likes/${data._id}`, {
			method: "DELETE",
			headers: this.headers
		})
			.then(this.onRes);
	}

	editAvatar(data) {
		return fetch(`${this.baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify(data)
		})
			.then(this.onRes);
	}

	dataAll() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()])
	}
}