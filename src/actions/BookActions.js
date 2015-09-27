import api from '../api';

export function setBooks(books, mode = null) {
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
	return function(dispatch, getState) {
		api.getBook(bookId).then(book => {
			dispatch(setBookInfo(book.length == 1 ? book[0] : null));
		});
	};
}

export function fetchBooks(mode = null) {
	return function(dispatch, getState) {

		let books = getState().books.books;

		if (!books || books.length == 0) {
			api.getBooks(null).then(books => {
				dispatch(setBooks(books, mode));
			});	
		} else {
			dispatch(setBooks(books, mode));		
		}
	};
}