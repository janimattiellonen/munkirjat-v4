import { handleActions } from 'redux-actions';
import { List, Map } from 'immutable';


const defaultState = Map({
    authors: List(),
    books: List(),
    book: {},
    author: {}
});

export default handleActions({
	AUTHOR_ADD: (state, action) => {
		console.log("ppp2p");
		console.log("size: " + state.authors.count());
		console.log("size 2: " + state.authors.push(action.author).count());
		console.log("aa: " + JSON.stringify(action.author));

		return {
			...state,
			authors: List(state.authors.push(action.author))
		}
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