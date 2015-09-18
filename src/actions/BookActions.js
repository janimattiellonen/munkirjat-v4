import api from '../api';

export function setBooks(books, mode = null) {
	console.log("BookActions::setBooks(), mode: " + mode);
	return {
		type: 'BOOKS_FETCH',
		books: books,
		mode: mode
	};
}


export function fetchBooks(mode = null) {
	console.log("BookActions::fetchBooks()");
	return function(dispatch, getState) {
		api.getBooks(mode).then(books => {
			dispatch(setBooks(books, mode));
		});
	};
}