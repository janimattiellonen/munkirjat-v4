import React from "react";
import {List} from "immutable";
import Api from "../api";
import Stats from "./Stats";
import StatsList from "./dumb/StatsList";

export default React.createClass({

	render() {
		const {authors, books} = this.props;

		let currentlyReadBook = Stats.getCurrentlyReadBook(books);
		let latestReadBook = Stats.getLatestReadBook(books);

		let currentlyReadBookArr = null !== currentlyReadBook ? [currentlyReadBook] : [];
		let latestReadBookArr = null !== latestReadBook ? [latestReadBook] : [];

		return (
			<div className="stats-main">
				<p>{this.foo()}</p>

				<div className="box h_taller">
					<h2>Currently reading</h2>

					<StatsList items={currentlyReadBookArr} render={this.renderBookItem} />

				</div>

				<div className="box h_taller">
					<h2>Latest read book</h2>

					<StatsList items={latestReadBookArr} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Latest added books</h2>

					<StatsList items={Stats.getLatestAddedBooks(books, 10)} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Favourite authors</h2>

					<StatsList items={Stats.getFavouriteAuthors(authors, 10)} render={this.renderAuthorItem} />
				</div>

				<div className="box h_tallest">
					<h2>Recently read books</h2>

					<StatsList items={Stats.getRecentlyReadBooks(books, 10)} render={this.renderBookItem} />
				</div>

				<div className="box h_tallest">
					<h2>Unread books</h2>

					<StatsList items={Stats.getUnreadBooks(books, 10)} render={this.renderBookItem} />
				</div>

			</div>
		);
	},

	foo() {
		return localStorage.getItem('userToken');
	},

	renderAuthorItem(item) {
		if (null === item) {
			console.log("renderAuthorItem is empty");
			return "";
		}

		return (
			<a href={"/#/author/" + item.id}>{item.name + " (" + item.amount + ")"}</a>
		)
	},

	renderBookItem(item) {
		if (null === item) {
			console.log("renderBookItem is empty");
			return "";
		}

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