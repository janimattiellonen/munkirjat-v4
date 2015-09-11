import React from "react";
import Immutable from "immutable";

export default React.createClass({

		getInitialState() {
			return {
				score: 3
			}
		},

	render() {
		let player = this.props.player;

		return (
			<div className="score-selector">

			</div>
		);
	},


});