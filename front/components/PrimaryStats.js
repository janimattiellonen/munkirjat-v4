var React 				= require('react');
var StatsBox 			= require('./StatsBox');
var Translate   		= require('react-translate-component');

var PrimaryStats = React.createClass({
	render: function() {
		return (
			<div className="stats-main">
				<StatsBox title="currentlyReading" url="/stats/currently-reading" />
				<StatsBox title="latestReadBook" url="/stats/latest-read" />
			</div>
		);
	}
});

module.exports = PrimaryStats;