import { serverConfig } from "./utils.js";

const onRes = res => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
};

const user = () => {
	return fetch(`${serverConfig.url}/users/me`, {
		headers: serverConfig.headers
	})
	.then(onRes)
};

const getCards = () => {
	return fetch(`${serverConfig.url}/cards`, {
		headers: serverConfig.headers
	})
	.then(onRes)
};

const editProfile = (data) => {
	return fetch(`${serverConfig.url}/users/me`, {
		method: "PATCH",
		headers: serverConfig.headers,
		body: JSON.stringify(data)
	})
	.then(onRes)
};

const addCards = (data) => {
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

const addLike = (cardId) => {
	return fetch(`${serverConfig.url}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: serverConfig.headers,
	})
	.then(onRes)
};

const removeLike = (cardId) => {
	return fetch(`${serverConfig.url}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: serverConfig.headers,
	})
	.then(onRes)
};

export { user, getCards, editProfile, addCards, editAvatar, deleteCard, addLike, removeLike };