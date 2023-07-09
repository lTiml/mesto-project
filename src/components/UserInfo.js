export default class UserInfo {
    constructor({ nameSelector, aboutSelector }, api) {
        this.nameElement = document.querySelector(nameSelector);
        this.aboutElement = document.querySelector(aboutSelector);
        this.api = api;
    }

    getUserInfo() {
        return this.api.getUserInfo()
            .then((userData) => {
                this.nameElement.textContent = userData.name;
                this.aboutElement.textContent = userData.about;
                return userData;
            });
    }

    setUserInfo({ name, about }) {
        return this.api.editProfile({ name, about })
            .then((userData) => {
                this.nameElement.textContent = userData.name;
                this.aboutElement.textContent = userData.about;
                return userData;
            });
    }
}
