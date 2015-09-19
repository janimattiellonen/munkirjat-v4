import api from '../api';

export function setAuthors(authors) {
	return {
		type: 'AUTHORS_FETCH',
		authors: authors,
	};
}

export function fetchAuthors() {
	return function(dispatch, getState) {
		api.getAuthors().then(authors => {
			dispatch(setAuthors(authors));
		});
	};
}