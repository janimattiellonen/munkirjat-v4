import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import moment from 'moment';

export default handleActions({

	BOOK_INFO_FETCH: (state, action) => {
		return {
			...state,
			book: action.book
		};
	},

	BOOKS_FETCH: (state, action) => {
		return {
			...state,
			books: action.books,
			mode: state.mode
		};
	},

}, {books: List(), d: moment(), mode: undefined});