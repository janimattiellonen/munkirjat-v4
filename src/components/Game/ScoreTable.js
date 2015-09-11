import React from "react";
import Immutable from "immutable";

export default React.createClass({


	render() {

		return (
			<div>
				<h3>Tulostaulukko</h3>

				<table>
					<thead>
						<th>Väylä</th>

						{this.players.map(player => {
							<th>{player.label}</th>
						})}
					</thead>

					<tbody>

					</tbody>

					<tfoot>

					</tfoot>

				</table>
			</div>
		);
	},

	
});