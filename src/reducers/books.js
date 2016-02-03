import { handleActions } from 'redux-actions';
import { List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

//import {Suite} from 'Benchmark';

function sortBooks(books) {
	return _.sortByOrder(books.toArray(), ['title'], ['asc']);
}

export default handleActions({
	BOOK_ADD: (state, action) => {
		let book = action.book;
		let authors = List();
		let genres = OrderedMap();

		_.forEach(book.authors, function (value, key) {
			authors = authors.push(value);
		});

		_.forEach(book.genres, function (genre, key) {
			console.log("sakka: " + JSON.stringify(genre) + ", " + JSON.stringify(key));
			genres = genres.set(genre.id, genre);
		});

		book.authors = authors;
		book.genres = genres;

		return {
			...state,
			books: state.books.push(book)
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

	SET_BOOK_INFO: (state, action) => {

		let book = action.book;
		let genres = OrderedMap();
		console.log("rekka: " + JSON.stringify(book));
		_.forEach(book.genres, function (genre, key) {
			console.log("ragnars: " + JSON.stringify(genre) + ", " + JSON.stringify(key));
			genres = genres.set(genre.id, genre);
		});

		book.genres = genres;
		book.authors = List(book.authors);

		return {
			...state,
			book: book
		};
	},

	BOOKS_FETCH: (state, action) => {
		console.log("BOOKS_FETCH");
		let booksList = action.books;
		let books = List();
		
		booksList.map((book, i) => {
			let genres = OrderedMap();

			_.forEach(book.genres, function(genre, key) {
				genres = genres.set(genre.id, genre);
			});

			book.authors = List(book.authors);
			book.genres = genres;

			books = books.push(book);
		});	

		return {
			...state,
			books: books,
			mode: state.mode
		};
	},

}, {books: List(), d: moment(), mode: undefined, book: undefined});