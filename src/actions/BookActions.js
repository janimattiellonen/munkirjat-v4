import api from '../api';

export function setBooks(books, mode = null) {
	console.log("BookActions::setBooks(), mode: " + mode);
	return {
		type: 'BOOKS_FETCH',
		books: books,
		mode: mode
	};
}

export function setBookInfo(book) {
	return {
		type: 'BOOK_INFO_FETCH',
		book: book
	};
}

export function fetchBookInfo(bookId) {
	console.log("fetchBookInfo");
	return function(dispatch, getState) {
		console.log("fetchBookInfo:dispatch");
		let book = {
			id: Math.floor((Math.random() * 100) + 1),
			title: 'Heh' + Math.floor((Math.random() * 1000) + 1),
			is_read: false
		};

		dispatch(setBookInfo(book));

		/*
		api.getBooks(mode).then(books => {
			dispatch(setBookInfo(books, mode));
		});
	*/
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

export function fooks() {
	return function(dispatch, getState) {
		console.log("fooks");
	};
}