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
	},

	COVER_REMOVE: (state, action) => {
		console.log("COVER_REMOVE:A");
		let covers = state.covers;
		console.log("COVER_REMOVE:B");
		let index = covers.findIndex(cover => cover == action.payload);

		console.log("COVER_REMOVE: " + index);

		return {
			...state,
			covers: covers.remove(index)
		}
	}

}, {covers: List()});