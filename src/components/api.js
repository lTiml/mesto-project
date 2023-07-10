import { profileName, profileJob, inputPlace, inputUrl, inputAvatarUrl } from "./utils.js";

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

	likeCard(cardId) {
		return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
			method: "PUT",
			headers: this.headers
		})
			.then(this.onRes);
	}

	dislikeCard(cardId) {
		return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
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
}

