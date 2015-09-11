import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import moment from 'moment';

export default handleActions({

	RECEIVE_PLAYERS: (state, action) => {
		
		return {
			...state,
			players: action.players,
			d: state.d
		};
	},

	SELECTED_PLAYERS: (state, action) => {
		return {
			...state,
			selectedPlayers: action.selectedPlayers,
			selectedPlayersJoined: action.selectedPlayersJoined
		};
	}

}, { players: List(), selectedPlayers: List(), selectedPlayersJoined: "", d: moment()});
