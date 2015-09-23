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
			</div>	
		);
	}
});
