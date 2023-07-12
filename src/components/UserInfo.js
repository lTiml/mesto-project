// export default class UserInfo {
//     constructor({ nameSelector, aboutSelector }, api) {
//         this.nameElement = document.querySelector(nameSelector);
//         this.aboutElement = document.querySelector(aboutSelector);
//         this.api = api;
//     }

//     getUserInfo() {
//         return this.api.getUserInfo()
//             .then((userData) => {
//                 this.nameElement.textContent = userData.name;
//                 this.aboutElement.textContent = userData.about;
//                 return userData;
//             });
//     }

//     setUserInfo({ name, about }) {
//         return this.api.editProfile({ name, about })
//             .then((userData) => {
//                 this.nameElement.textContent = userData.name;
//                 this.aboutElement.textContent = userData.about;
//                 return userData;
//             });
//     }
// }


export default class UserInfo {
	constructor(profileName, profileAbout, profileAvatar) {
		this._profileName = profileName;
		this._profileAbout = profileAbout;
		this._profileAvatar = profileAvatar;
		this._name = document.querySelector(this._profileName);
		this._about = document.querySelector(this._profileAbout);
		this._avatar = document.querySelector(this._profileAvatar);
	}

	getUser() {
		const data = {
			name: this._name.textContent,
			about: this._about.textContent
		};
		return data;
	}

	editAvatar(data) {
		this._avatar.src = data.avatar;
	}

	editProfile(data) {
		this.id = data._id;
		this._name.textContent = data.name;
		this._about.textContent = data.about;
		this.editAvatar(data);
		this._avatar.alt = `${data.name}`;
	}
};