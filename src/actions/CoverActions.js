import api from '../api';
import * as Errors from './Errors';

export function setCovers(covers) {
	return {
		type: 'COVERS_SET',
		payload: covers,
	};
}

export function fechCovers() {
	return function(dispatch, getState) {
		api.getCovers().then(covers => {
			dispatch(setCovers(covers));
		}).catch(Errors.handleError);
	};
}