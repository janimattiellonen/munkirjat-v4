import React from "react";
import Immutable from "immutable";
import Api from "../../api";
import Player from "./Player"

export default React.createClass({

	getInitialState() {
		return {
			'players': Immutable.List()
		}
	},

	render() {

		return (
			<div className="player-list">
				{this.props.players.map(player => {
					return (<Player key={player.uuid} player={player} />)
				})}
			</div>
		);
	}
});