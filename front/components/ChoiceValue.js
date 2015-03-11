var React 				= require('react');
var Translate   		= require('react-translate-component');

var ChoiceValue = React.createClass({
	render: function() {

		return (
			<span><Translate content={(this.props.state === true ? "yes" : "no")} /></span>
		);
	}

});

module.exports = ChoiceValue;