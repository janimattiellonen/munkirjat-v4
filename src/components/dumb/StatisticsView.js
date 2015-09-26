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
		console.log("STATS");
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

				<p>{this.getAverageReadTime()}</p>					

				<h3>Estimated time to read all unread books</h3>

				<p>{numeral(this.getTimeTakenToReadAllUnreadBooks()).format("0.0[00]")}</p>
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
		return this.formatDays(Stats.getSlowestReadTime(this.props.books));
	},	

	getFastestReadTime() {
		return this.formatDays(Stats.getFastestReadTime(this.props.books));
	},

	getAverageReadTime() {
		return this.formatDays(numeral(Stats.getAverageReadTime(this.props.books)).format("0.0"));
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
