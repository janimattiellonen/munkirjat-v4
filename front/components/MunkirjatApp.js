var React 			= require('react');
var Router 			= require('react-router');
var RouteHandler 	= Router.RouteHandler;

var MunkirjatApp = React.createClass({
	render: function() {
		return (
			<RouteHandler />
		);
	}
});

module.exports = MunkirjatApp;