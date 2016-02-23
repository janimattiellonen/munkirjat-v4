import api from '../api';
import * as Errors from './Errors';

import {replaceBook} from './BookActions';

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

export function removeCover(cover) {
	return {
		type: 'COVER_REMOVE',
		payload: cover
	}
}

export function linkBookAndCover(book, coverUrl) {
	console.log("linkBookAndCover: coverUrl: " + coverUrl + ", book: " + JSON.stringify(book));
	return function(dispatch, getState) {
		api.linkBookAndCover(book.id, coverUrl).then(result => {
			book.cover_url = coverUrl;
			dispatch(replaceBook(book));
			dispatch(removeCover(coverUrl));
		}).catch((s) => {
			console.log("s: " + JSON.stringify(s));
		});
	}
}

