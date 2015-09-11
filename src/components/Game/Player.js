import React from "react";
import Immutable from "immutable";
import Api from "../../api";

export default React.createClass({

	getInitialState() {
		return {
			
		}
	},

	render() {
		let player = this.props.player;

		return (
			<div className="player-row">
				<div className="player-avatar col">LUSS</div>
				<div className="player-name col">{player.label}</div>
			</div>
		);
	}
});