import React from "react";
import Immutable from "immutable";
import Status from "./Status"

export default React.createClass({

	getInitialState() {
		return {
			
		}
	},

	render() {
		var statuses = this.props.statuses;

		return (
			<div>
				{statuses.map(status => {
					return (<Status key={status.uuid} status={status} />)
				})}
			</div>
		);
	}
});