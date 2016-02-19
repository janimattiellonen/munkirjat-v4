import api from '../api';
import * as Errors from './Errors';

export function setCovers(covers) {
	return {
		type: 'COVERS_SET',
		payload: covers,
	};
}

export function fetchCovers() {
	return function(dispatch, getState) {
		console.log("fetchCovers:1");
		api.getCovers().then(covers => {
			console.log("fetchCovers:2");

			dispatch(setCovers(covers));
		}).catch(Errors.handleError);
	};
}