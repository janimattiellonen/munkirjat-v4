var React = require('react');
var Router = require('react-router');
var PrimaryStats = require('./PrimaryStats');
var SecondaryStats = require('./SecondaryStats');

var MunkirjatApp = React.createClass({
	render: function() {
		return (
			<div>
				<PrimaryStats />
				<SecondaryStats />
			</div>
		);
	}
});

module.exports = MunkirjatApp;