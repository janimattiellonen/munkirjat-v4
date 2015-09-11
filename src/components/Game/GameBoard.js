import React from "react";
import Immutable from "immutable";
import PlayerField from "./PlayerField";

export default React.createClass({

	render() {

		const { players} = this.props;

		return (
			<div>
				{players.map(player => {
					return(
						<div key={player.uuid}>
							<PlayerField key={player.uuid} player={player} hole={this.props.hole} gameActions={this.props.gameActions} />
						</div>
					)
				})}
			</div>
		);
	},
});