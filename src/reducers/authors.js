import { handleActions } from 'redux-actions';
import { List } from 'immutable';

export default handleActions({
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

}, {authors: List(), author: {}, books: List()});