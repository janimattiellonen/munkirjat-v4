var React 				= require('react');
var CurrentlyReading 	= require('./CurrentlyReading');


var PrimaryStats = React.createClass({
	render: function() {
		return (
			<div className="stats-main">
				<CurrentlyReading />

			</div>
		);
	}
});

module.exports = PrimaryStats;