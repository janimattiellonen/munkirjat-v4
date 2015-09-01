var React 			= require('react');
var Router 			= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Fluxxor 		= require('fluxxor');
var FluxMixin 		= Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MunkirjatApp = React.createClass({
	mixins: [FluxMixin],

	contextTypes: {
    	router: React.PropTypes.func
  	},

	getInitialState: function() {
		return {
		
		};
	},

	render: function() {
		return (
			<RouteHandler {...this.props} />
		);
	}
});

module.exports = MunkirjatApp;