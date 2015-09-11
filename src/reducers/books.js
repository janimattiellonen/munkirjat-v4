import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import moment from 'moment';

export default handleActions({

	BOOKS_FETCH: (state, action) => {
		return {
			...state,
			books: action.books
		};
	},

}, {books: List(), d: moment()});