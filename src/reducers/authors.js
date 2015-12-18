import { handleActions } from 'redux-actions';
import { List, Map, Seq } from 'immutable';
import _ from 'lodash';

const defaultState = Map({
    authors: List(),
    books: List(),
    book: {},
    author: {}
});

function sortAuthors(authors) {
	return _.sortByOrder(authors.toArray(), ['lastname', 'firstname'], ['asc']);
}

export default handleActions({
	AUTHOR_DELETE: (state, action) => {
		let list = List(state.authors);
		let i = list.findIndex(item => item.id === action.id);

		return {
			...state,
			authors: list.remove(i)
		}
	},

	AUTHOR_ADD: (state, action) => {
		let authors = List(state.authors.push(action.author));

		return {
			...state,
			authors: List(sortAuthors(authors))
		}
	},

	AUTHOR_UPDATE: (state, action) => {

		let list = List(state.authors);
		let i = list.findIndex(item => item.id === action.author.id);

		list = list.set(i, action.author);

		return {
			...state,
			authors: List(sortAuthors(list))
		}
	},

	AUTHOR_RESET: (state, action) => {
		return {
			...state,
			author: {}
		};
	},

	AUTHOR_FETCH: (state, action) => {

		return {
			...state,
			author: action.author
		};
	},

	AUTHORS_FETCH: (state, action) => {
		return {
			...state,
			authors: action.authors
		};
	},

	BOOK_INFO_FETCH: (state, action) => {
		return {
			...state,
			book: action.book,
			showBookInfo: action.book.id != undefined
		};
	},	

}, {authors: List(), author: {}, books: List(), book: {}});