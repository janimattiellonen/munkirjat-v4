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

		if (books.count() == 1) {
			let selectedBook = books.first();
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
			console.log("fetchBookInfo: " + JSON.stringify(book));
			dispatch(setBookInfo(book));
		}).catch(function (response) {
			if (response instanceof Error) {
				console.log("fetchBookInfo, error? " + JSON.stringify(response.message));
			} else {
				console.log(response.data);
				console.log(response.status);
				console.log(response.headers);
				console.log(response.config);
			}
			
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
		console.log("CREATING BOOK...");
		api.saveBook(book).then(book => {
			dispatch(addBook(book));
			console.log("CREATED	 BOOK 2...");
			history.pushState(null, '/book/' + book.id);
		}).catch(function (response) {
			if (response instanceof Error) {
				console.log("createBook, error? " + JSON.stringify(response.message));
			} else {
				console.log(response.data);
				console.log(response.status);
				console.log(response.headers);
				console.log(response.config);
			}
			
		});
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
