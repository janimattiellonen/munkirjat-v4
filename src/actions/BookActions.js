import api from '../api';

export function setBooks(books) {
	return {
		type: 'BOOKS_FETCH',
		books: books
	};
}


export function fetchBooks(mode = null) {
	return function(dispatch, getState) {
		api.getBooks(mode).then(books => {
			dispatch(setBooks(books));
		});
	};
}