import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import moment from 'moment';

export default handleActions({
	COVERS_SET: (state, action) => {

		let covers = List(action.payload);
		console.log("COUNT: " + covers.count());
		return {
			...state,
			covers: covers
		}
	}

}, {covers: List()});