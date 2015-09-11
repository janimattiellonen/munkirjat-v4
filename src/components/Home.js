import React from "react";
import Immutable from "immutable";
import Api from "../api";
import StatusList from "./StatusList";

export default React.createClass({

	getInitialState() {
		return {
			'statuses': Immutable.List()
		}
	},

	render() {
		return (
			<div><StatusList statuses={this.state.statuses} /></div>
		);
	},

	componentDidMount() {
        this.getStatuses();
    },

	getStatuses() {
		Api.getStatuses().then(statuses => {
			this.setState({
				'statuses': statuses
			});
		});
	}
});