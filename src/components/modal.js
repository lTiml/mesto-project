import { editPopup, profileName, profileJob, nameInput, jobInput } from "../index";
function editProfile () {
	
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	closePopup(editPopup);
};

export { editProfile };