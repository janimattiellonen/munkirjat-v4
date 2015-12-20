import api from '../api';
import history from '../components/history';

export function addBook(book) {
	return {
		type: 'BOOK_ADD',
		book: book,
	};
}

export function replaceBook(book) {
	return {
		type: 'BOOK_UPDATE',
		book: book,
	};
}

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
			dispatch(setBookInfo(book));
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

export function createBook(book) {
	return function(dispatch, getState) {

		api.saveBook(book).then(book => {
			dispatch(addBook(book));
			history.pushState(null, '/book/' + book.id);
		});
	};
}

export function updateBook(book) {

	return function(dispatch, getState) {
		api.updateBook(book).then(book => {
			dispatch(replaceBook(book));
			Noty.info('Book updated');
		});
	}
}
