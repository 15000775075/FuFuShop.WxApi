import { apiRequestSync } from './request.js';
const scope = "note"

export const getNote = (params) => {
	return apiRequestSync(`${scope}/get`, "GET", params);
}


export const addNote = (params) => {
	return apiRequestSync(`${scope}/add`, "POST", params);
}

export const getNoteList = (params) => {
	return apiRequestSync(`${scope}/usernNotePageList`, "POST", params);
}

