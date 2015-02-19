var React 				= require('react');
var StatsBox 			= require('./StatsBox');
var Translate   		= require('react-translate-component');
var DateValue			= require('./DateValue');

var PrimaryStats = React.createClass({
	render: function() {

		var hrefCallback = function(item) {
			return (
				<a href={"#/book/" + item.id}>
					{item.title}<br/><DateValue date={item.created_at} />
				</a>
			)
		};

		return (
			<div className="stats-main">
				<StatsBox title="currentlyReading" url="/stats/currently-reading" />
				<StatsBox title="latestReadBook" url="/stats/latest-read" />

				<StatsBox title="latestAddedBooks" url="/stats/latest-added" hrefCallback={hrefCallback} />
			</div>
		);
	}

});

module.exports = PrimaryStats;