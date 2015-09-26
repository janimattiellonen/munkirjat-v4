import React from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import numeral from 'numeral';

export default React.createClass({

	getDefaultProps() {
		stats: Immutable.List([])
	},

	render() {
		return (
            <div className="stats-main">
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

				<p>{numeral(this.getAverageReadTime()).format("0.0")}</p>					

				<h3>Estimated time to read all unread books</h3>

				<p>{numeral(this.getTimeTakenToReadAllUnreadBooks()).format("0.0[00]")}</p>
			</div>	
		);
	},

	getUnreadBookCount() {
		return this.props.books.filter(n => n.is_read == 0).count();
	},

	getReadBookCount() {
		return this.props.books.filter(n => n.is_read == 1).count();
	},

	getSlowestReadTime() {
		let readTime = null;

		this.props.books.filter(n => n.is_read == 1).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) > readTime) {
					readTime = endDate.diff(startDate);
				}
			}
		});

		return this.formatDays(readTime / 1000 / 86400);
	},	

	getFastestReadTime() {
		let readTime = null;

		this.props.books.filter(n => n.is_read == 1).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) < readTime) {
					readTime = endDate.diff(startDate);
				}
			}
		});

		return this.formatDays(readTime / 1000 / 86400);
	},

	getAverageReadTime() {
		let readTime = 0;

		let readBooks = this.props.books.filter(n => n.is_read == 1);
		readBooks.map(book => {
			if (null != book.started_reading && null != book.finished_reading) {

				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				readTime += endDate.diff(startDate);
			}
		});

		return readTime > 0 ? readTime / 1000 / 86400 / readBooks.count() : 0;
	},

	getTimeTakenToReadAllUnreadBooks() {
		let readTime = null;

		this.props.books.filter(n => n.is_read == 0).map(book => {

			

		});
	},

	formatDays(days) {
		return days > 1 ? days + " days" : days + " day";
	},			
});
