import React from 'react';
import Immutable from 'immutable';

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
			</div>	
		);
	},

	getUnreadBookCount() {
		return this.props.books.filter(n => n.is_read == 0).count();
	},

	getReadBookCount() {
		return this.props.books.filter(n => n.is_read == 1).count();
	}	
});
