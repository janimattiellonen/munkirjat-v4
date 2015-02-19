var React 				= require('react');
var StatsBox 			= require('./StatsBox');
var Translate   		= require('react-translate-component');

var DateValue = React.createClass({
	render: function() {

		return (
			<span>{moment(this.props.date).format("D.M.YYYY")}</span>
		);
	}

});

module.exports = DateValue;