
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