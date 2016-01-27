import { handleActions } from 'redux-actions';
import { List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

function sortBooks(books) {
	return _.sortByOrder(books.toArray(), ['title'], ['asc']);
}

export default handleActions({
	BOOK_ADD: (state, action) => {

		return {
			...state,
			books: List(state.books.push(action.book))
		}
	},

	BOOK_UPDATE: (state, action) => {
		let list = List(state.books);
		let i = list.findIndex(item => item.id === action.book.id);

		list = list.set(i, action.book);

		return {
			...state,
			books: List(sortBooks(list))
		}
	},	

	BOOK_INFO_FETCH: (state, action) => {
		return {
			...state,
			book: action.book
		};
	},

	BOOKS_FETCH: (state, action) => {
		let booksList = action.books;
		let books = OrderedMap();
		
		booksList.map(book => {
			let authors = OrderedMap();
			let genres = OrderedMap();

			book.authors.map(book => {
				authors = authors.set(book.id, book);
			});

			book.genres.map(genre => {
				genres = genres.set(genre.id, genre);
			});

			book.authors = authors;
			book.genres = genres;

			books = books.set(book.id, book);
		});	

		return {
			...state,
			books: books,
			mode: state.mode
		};
	},

}, {books: List(), d: moment(), mode: undefined, book: undefined});