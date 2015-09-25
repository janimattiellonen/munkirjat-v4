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
	return function(dispatch, getState) {
		api.getBook(bookId).then(book => {
			console.log("BOOK: " + JSON.stringify(book));
			dispatch(setBookInfo(book.length == 1 ? book[0] : null));
		});
	};
}

export function fetchBooks(mode = null) {
	return function(dispatch, getState) {

		let books = getState().books.books;

		console.log("ooo: " + JSON.stringify(books));

		if (!books || books.length == 0) {
			console.log("fetchBooks:A");
			api.getBooks(null).then(books => {
				dispatch(setBooks(books, mode));
			});	
		} else {
			console.log("fetchBooks:B " + books.length);
			dispatch(setBooks(books, mode));		
		}
	};
}