import api from '../api';
import history from '../components/history';
import Noty from '../components/Noty';
import * as Errors from './Errors';

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

export function setSelectedBook(bookId) {
	return function(dispatch, getState) {
		if (null == bookId) {
			return dispatch(setBookInfo(null));
		}
		let books = getState().books.books.filter(book => book.id == bookId);
		let selectedBook = null;

		if (books.count() == 1) {
			selectedBook = books.first();
			dispatch(setBookInfo(selectedBook));
		} else {
			dispatch(fetchBookInfo(bookId));
		}
	};
}

export function setBookInfo(book) {
	return {
		type: 'SET_BOOK_INFO',
		book: book
	};
}

export function fetchBookInfo(bookId) {
	return function(dispatch, getState) {
		api.getBook(bookId).then(book => {
			dispatch(setBookInfo(book));
		}).catch(Errors.handleError);
	};
}

export function fetchBooks(mode = null) {
	return function(dispatch, getState) {
		let books = getState().books.books;

		if (!books || books.count() == 0) {
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
		}).catch(Errors.handleError);
	};
}

export function updateBook(book) {

	return function(dispatch, getState) {
		api.updateBook(book).then(book => {
			dispatch(replaceBook(book));
			Noty.info('Book updated');
		}).catch(Errors.handleError);
	}
}
