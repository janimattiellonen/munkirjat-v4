var React 		= require('react');
var Immutable 	= require('immutable');
var StatsItem 	= require('./StatsItem');

var $ = require('jquery');

var SecondaryStats = React.createClass({

	getInitialState: function() {
		return {
			'stats':  Immutable.List([])
		};
	},

	componentDidMount: function() {
		var self = this;

		$.get('/stats').done(function(data) {
			self.setState({
				'stats': Immutable.List(data)
			});
		});
	},

	render: function() {
		var self = this;

		return (
			<div className="stats">
				<h2>Statistics</h2>

				{this.state.stats.map(function(item, index){
					return <StatsItem key={index} stat={item} />
				}).toArray()}

			</div>
		);
	}
});

module.exports = SecondaryStats;