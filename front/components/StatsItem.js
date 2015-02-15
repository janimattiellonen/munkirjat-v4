var counterpart = require('counterpart');
var React 		= require('react');
var Translate   = require('react-translate-component');

var StatsItem = React.createClass({
	render: function() {
		return (
			<div>
				<h3><Translate content={this.props.stat.title} /></h3>

				<p>{ this.props.stat.value }</p>
			</div>
		);
	}
});

module.exports = StatsItem;