import api from '../api';

export function setBooks(books) {
	return {
		type: 'SET_BOOKS',
		books: books
	};
}

export function getBooks() {
	return function(dispatch, getState) {
		api.getBooks("").then(books => {
			dispatch(setBooks(books));
		});
	};
}