import React from "react";
import {List} from "immutable";
import Api from "../api";
import Stats from "./Stats";
import StatsList from "./dumb/StatsList";

export default React.createClass({

	render() {
		const {authors, books} = this.props;
		console.log("ii: " + JSON.stringify(Stats.getCurrentlyReadBook(books)));
		return (
			<div className="stats-main">
				<div className="box h_taller">
					<h2>Currently reading</h2>


					<StatsList items={[Stats.getCurrentlyReadBook(books)]} render={this.renderItem} />

				</div>
			</div>
		);
	},

	renderItem(item) {
		alert("books will be empty if you don't navigate through one of the books listings first. Fix this!");
		return (
			<a href={"/#/book/" + item.id}>{item.title}</a>
		)
	},

	currentlyReading(book) {
		if (null === book) {
			return '<p>Nothing at the moment</p>';
		} else {
			return "<div>lll</div>";
		}
	}

});