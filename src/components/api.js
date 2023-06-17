import { serverConfig } from "./utils.js";

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