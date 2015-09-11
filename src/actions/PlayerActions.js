import api from '../api'
import store from 'store';
import _ from 'lodash';

export function receivePlayers(players, d) {
    return {
        type: 'RECEIVE_PLAYERS',
        players: players,
        d: d
    };
}

export function setSelectedPlayerIds(selectedPlayerIds) {
    return function(dispatch, getState) {
        const { players} = getState().players;

        let found = players.filter(function(player) {
            return _.includes(selectedPlayerIds, player.value);
        });

        dispatch(selectedPlayers(found));
    }
}

export function selectedPlayers(selectedPlayers) {

    let ids = [];

    selectedPlayers.map(function(player)
    {
        ids.push(player.value);
    });

    let selectedPlayersJoined = ids.join(',');

    store.set('SELECTED_PLAYERS', selectedPlayers);
    store.set('SELECTED_PLAYERS_JOINED', selectedPlayersJoined);

    return {
        type: 'SELECTED_PLAYERS',
        selectedPlayers: selectedPlayers,
        selectedPlayersJoined: selectedPlayersJoined
    };
}