import api from '../api';
import * as Errors from './Errors';

export function setCovers(covers) {
	return {
		type: 'COVERS_SET',
		payload: covers,
	};
}

export function fetchCovers() {
	return function(dispatch, getState) {
		console.log("fetchCovers:1");
		api.getCovers().then(covers => {
			console.log("fetchCovers:2");

			dispatch(setCovers(covers));
		}).catch(Errors.handleError);
	};
}

export function uploadFile(file, data) {
	return function(dispatch, getState) {
		api.uploadFile(file, data).then(result => {
			console.log("UPLOADED FILE: " + JSON.stringify(result));
		}).catch(Errors.handleError);
	}
}

export function linkBookAndCover(bookId, coverUrl) {
	console.log("linkBookAndCover");
	return function(dispatch, getState) {
		api.linkBookAndCover(bookId, coverUrl).then(result => {

		}).catch(Errors.handleError);
	}
}