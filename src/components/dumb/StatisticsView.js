import React from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import numeral from 'numeral';
import Stats from '../Stats';

export default React.createClass({

	getDefaultProps() {
		stats: Immutable.List([])
	},

	render() {
		return (
            <div className="stats">
				<h2>Statistics</h2>

				<h3>Unread books</h3>

				<p>{this.getUnreadBookCount()}</p>

				<h3>Read books</h3>

				<p>{this.getReadBookCount()}</p>	

				<h3>Books in bookshelf</h3>

				<p>{this.props.books.count()}</p>

				<h3>Authors in bookshelf</h3>

				<p>{this.props.authors.count()}</p>	

				<h3>Slowest read time</h3>		

				<p>{this.getSlowestReadTime()}</p>		

				<h3>Fastest read time</h3>		

				<p>{this.getFastestReadTime()}</p>	

				<h3>Average read time</h3>		

				<p>{this.getAverageReadTime()}</p>					

				<h3>Estimated time to read all unread books</h3>

				<p>{this.getTimeTakenToReadAllUnreadBooks()}</p>

				<h3>Average book price</h3>

				<p>{this.getAverageBookPrice()}</p>

				<h3>Money spent on books</h3>

				<p>{this.getMoneySpentOnBooks()}</p>

				<h3>Pages read so far</h3>

				<p>{this.getPagesReadSoFar()}</p>
			</div>	
		);
	},

	getUnreadBookCount() {
		return Stats.getUnreadBookCount(this.props.books);
	},

	getReadBookCount() {
		return Stats.getReadBookCount(this.props.books);
	},

	getSlowestReadTime() {
		const {book, readTime} = Stats.getSlowestReadTime(this.props.books);

		return this.getBookLink(book, this.formatDays(readTime));
	},	

	getFastestReadTime() {
		const {book, readTime} = Stats.getFastestReadTime(this.props.books);

		return this.getBookLink(book, this.formatDays(readTime));
	},

	getBookLink(book, title) {
		if (null != book) {
			return (
				<a href={'/#/book/' + book.id}>{title}</a>
			)	
		} else {
			return 0;
		}
	},

	getAverageReadTime() {
		return this.formatDays(Stats.getAverageReadTime(this.props.books), true);
	},

	getTimeTakenToReadAllUnreadBooks() {
		return numeral(Stats.getTimeTakenToReadAllUnreadBooks(this.props.books)).format('0.00') + ' year(s)';
	},

	getAverageBookPrice(books) {
		let avg = Stats.getAverageBookPrice(this.props.books);
		return avg > 0 ? numeral(avg).format('0.00') + '€' : '0€';
	},

	getMoneySpentOnBooks() {
		let sum = Stats.getMoneySpentOnBooks(this.props.books);

		return sum > 0 ? numeral(sum).format('0.00') + '€' : '0€';
	},

	getPagesReadSoFar() {
		return Stats.getPagesReadSoFar(this.props.books);
	},

	formatDays(days, isDecimal = false) {
		if (isDecimal) {
			days = numeral(days).format('0.00');
		}

		return days > 1 ? days + ' days' : days + ' day';
	}		
});
