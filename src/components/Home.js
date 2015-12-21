import React from "react";
import Immutable from "immutable";
import Api from "../api";
import Stats from "./Stats";

export default React.createClass({

	render() {
		const {authors, books} = this.props;

		return (
			<div className="stats-main">
				<div className="box h_taller">
					<h2>Currently reading</h2>

					{this.currentlyReading(Stats.getCurrentlyReadBook(books))}



				</div>
			</div>
		);
	},

	currentlyReading(book) {
		if (null === book) {
			return '<p>Nothing at the moment</p>';
		} else {
			return "<div>lll</div>";
		}
	}

});