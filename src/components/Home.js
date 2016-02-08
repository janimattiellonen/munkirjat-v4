import React from 'react';
import {List} from 'immutable';
import Api from '../api';
import Stats from "./Stats";
import StatsList from "./dumb/StatsList";
import {Link} from 'react-router';

export default React.createClass({

	render() {
		const {authors, books} = this.props;

		let currentlyReadBook = Stats.getCurrentlyReadBook(books);
		let latestReadBook = Stats.getLatestReadBook(books);

		let currentlyReadBookArr = null !== currentlyReadBook ? [currentlyReadBook] : [];
		let latestReadBookArr = null !== latestReadBook ? [latestReadBook] : [];

		return (
			<div className="stats-main">
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

	renderAuthorItem(item) {
		if (null === item) {
			return (
				<span>nothing</span>
			)
		}

		return (
			<Link to={'/author/' + item.id}>{item.name + ' (' + item.amount + ')'}</Link>
		)
	},

	renderBookItem(item) {
		if (null === item) {
			return (
				<span>nothing</span>
			)
		}

		return (
			<Link to={'/book/' + item.id}>{item.title}</Link>
		)
	},

	currentlyReading(book) {
		if (null === book) {
			return (
				<p>Nothing at the moment</p>
			)
		} 
	}
});
