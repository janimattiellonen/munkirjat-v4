import api from '../api';

export function setBooks(books) {
	return {
		type: 'BOOKS_FETCH',
		books: books
	};
}


export function fetchBooks() {
	return function(dispatch, getState) {
		api.getBooks("").then(books => {
			dispatch(setBooks(books));
		});
	};
}