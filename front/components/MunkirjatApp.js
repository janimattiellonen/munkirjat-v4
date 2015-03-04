var React 			= require('react');
var Router 			= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Fluxxor 		= require('fluxxor');
var FluxMixin 		= Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MunkirjatApp = React.createClass({
	mixins: [FluxMixin, Router.State],

	getHandlerKey: function () {
	    var childDepth = 1; // assuming App is top-level route
	    var key = this.getRoutes()[childDepth].name;
	    var id = this.getParams().id;
	    if (id) { key += id; }
	    return key;
	},

	getInitialState: function() {
		return {
		
		};
	},

	render: function() {
		return (
			<RouteHandler key={this.getHandlerKey()} {...this.props} />
		);
	}
});

module.exports = MunkirjatApp;