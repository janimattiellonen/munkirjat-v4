import api from '../api';
import history from '../components/history';
import Noty from '../components/Noty';
import * as Errors from './Errors';


export function setGenres(genres) {
	return {
		type: 'GENRES_FETCH',
		genres: genres,
	};
}

export function fetchGenres() {
	return function(dispatch, getState) {
		api.getGenres().then(genres => {
			dispatch(setGenres(genres));
		}).catch(Errors.handleError);
	};
}