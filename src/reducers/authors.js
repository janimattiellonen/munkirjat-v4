import { handleActions } from 'redux-actions';
import { List, Map, Seq } from 'immutable';


const defaultState = Map({
    authors: List(),
    books: List(),
    book: {},
    author: {}
});

export default handleActions({
	AUTHOR_ADD: (state, action) => {

		return {
			...state,
			authors: List(state.authors.push(action.author))
		}
	},

	AUTHOR_UPDATE: (state, action) => {

		let list = List(state.authors);
		let i = list.findIndex(item => item.id === action.author.id);

		return {
			...state,
			authors: list.set(i, action.author)
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