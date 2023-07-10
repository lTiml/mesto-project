import { profileName, profileJob, inputPlace, inputUrl, inputAvatarUrl } from "./utils.js";

export default class Api {
	constructor({ baseUrl, headers }) {
		this._url = baseUrl;
		this._headers = headers;
	}

	_getRes(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Ошибка в getRes: ${res.status}`);
		}
	}

	userInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		})
		.then(this._getRes)
	};

	cardsInfo() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers,
		})
		.then(this._getRes)
	};

	profileInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: profileName.value,
				about: profileJob.value,
			})
		})
		.then(this._getRes);
	}

	addCard() {
		return fetch(`${this._url}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: inputPlace.value,
				link: inputUrl.value,
			})
		})
		.then(this._getRes)
	}

	editAvatar() {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				link: inputAvatarUrl.value,
			})
		})
		.then(this._getRes)
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		})
		.then(this._getRes)
	}

	toggleLike(cardId, isLiked) {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: isLiked ? "DELETE" : "PUT",
			headers: this._headers,
		})
		.then(this._getRes)
	}

	getInfo() {
		return Promise.all([this.userInfo(), this.cardsInfo()])
	};
}