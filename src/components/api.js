import { serverConfig, profileName, profileJob, inputPlace, inputUrl, inputAvatarUrl } from "./utils.js";

const onRes = res => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
};

const userInfo = () => {
	return fetch(`${serverConfig.url}/users/me`, {
		headers: serverConfig.headers
	})
	.then(onRes)
	.catch(err => console.log(`Ошибка в userInfo: ${err}`))
};

const getCards = () => {
	return fetch(`${serverConfig.url}/cards`, {
		headers: serverConfig.headers
	})
	.then(onRes)
};

const apiEditProfile = (data) => {
	return fetch(`${serverConfig.url}/users/me`, {
		method: "PATCH",
		headers: serverConfig.headers,
		body: JSON.stringify(data)
	})
	.then(onRes)
};

const addCards = (data) => {
	// console.log(data)
	return fetch(`${serverConfig.url}/cards`, {
		method: "POST",
		headers: serverConfig.headers,
		body: JSON.stringify(data)
	})
	.then(onRes)
};

const editAvatar = (data) => {
	return fetch(`${serverConfig.url}/users/me/avatar`, {
		method: "PATCH",
		headers: serverConfig.headers,
		body: JSON.stringify(data)
	})
	.then(onRes)
};

const deleteCard = (cardId) => {
	return fetch(`${serverConfig.url}/cards/${cardId}`, {
		method: "DELETE",
		headers: serverConfig.headers,
	})
	.then(onRes)
};

const toggleLikeState = (dataId, isLike) => {
	return fetch(`${serverConfig.url}/cards/likes/${dataId}`, {
		method: isLike ? "DELETE" : "PUT",
		headers: serverConfig.headers,
	})
	.then(res => onRes(res))
}

export { userInfo, getCards, apiEditProfile, addCards, editAvatar, deleteCard, toggleLikeState };

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