var React 				= require('react');
var Translate   		= require('react-translate-component');

var DateValue = React.createClass({
	render: function() {

		var date = (undefined != this.props.date ? moment(this.props.date).format("D.M.YYYY") : "");
		return (
			<span>{date}</span>
		);
	}

});

module.exports = DateValue;