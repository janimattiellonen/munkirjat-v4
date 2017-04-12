import { handleActions } from 'redux-actions';
import { List, Map, OrderedMap} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

export default handleActions({
	GENRES_FETCH: (state, action) => {

		let genres = OrderedMap();

		action.genres.map(genre => {
			genres = genres.set(parseInt(genre.id), genre);
		});

		return {
			...state,
			genres: genres
		}
	}

}, {genres: OrderedMap()});