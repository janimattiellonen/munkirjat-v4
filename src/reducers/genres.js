import { handleActions } from 'redux-actions';
import { List, Map} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

export default handleActions({
	GENRES_FETCH: (state, action) => {

		return {
			...state,
			genres: action.genres
		}
	}

}, {genres: List()});