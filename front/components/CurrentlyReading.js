var React 		= require('react');
var Immutable 	= require('immutable');

var Translate   = require('react-translate-component');

var CurrentlyReading = React.createClass({
		getInitialState: function() {
		return {
			'currentlyReading':  Immutable.List([])
		};
	},

	componentDidMount: function() {
		var self = this;

		$.get('/stats/currently-reading').done(function(data) {
			self.setState({
				'currentlyReading': Immutable.List(data)
			});
		});
	},
	render: function() {
		var self = this;
		return (
			<div className="box h_taller">
				<h2><Translate content="currentlyReading" /></h2>

				<ul>
					{ this.state.currentlyReading.map(function(item) {
						return self.renderLi(item);
					}).toArray()}
				</ul>
			</div>
		);
	},

	formatDate: function(timestamp) {
		return moment(timestamp).format("D.M.YYYY")
	},

	renderLi: function(item) {
		return (
			<li>
				<a href="#/book/{item.id}">
					{item.title}<br/>{this.formatDate(item.started_reading)} ({this.daysRead(item.started_reading)} daysRead)
				</a>
			</li>
		)
	},

	daysRead: function(startDate, endDate) {
		var startedReading = moment(startDate);
        var now = endDate == null ? moment() : moment(endDate);
        return now.diff(startedReading, 'days') + 1;
	}	
});

module.exports = CurrentlyReading;