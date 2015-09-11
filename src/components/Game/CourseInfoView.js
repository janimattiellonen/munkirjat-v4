import React from "react";
import Immutable from "immutable";
import Api from "../../api";

export default React.createClass({

	render() {

		if(!this.props.course.label) {
			return (
				<div>Rataa ei ole valittu</div>
			);
		} else {
			return (
				<div>
					<h3>{this.props.course.label}</h3>

					Layout: {this.props.course.layout.name}, {this.props.course.layout.holeCount} holes, {this.props.course.layout.length}m, par {this.props.course.layout.par}
				</div>
			);
		}

	}
});