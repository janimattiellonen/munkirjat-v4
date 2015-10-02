import { handleActions } from 'redux-actions';
import { List } from 'immutable';

export default handleActions({
	AUTHOR_ADD: (state, action) => {
		return {
			...state,
			authors: authors.push(action.author)
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