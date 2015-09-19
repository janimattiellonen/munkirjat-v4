import { handleActions } from 'redux-actions';
import { List } from 'immutable';

export default handleActions({

	AUTHORS_FETCH: (state, action) => {
		return {
			...state,
			authors: action.authors
		};
	},

}, {authors: List()});