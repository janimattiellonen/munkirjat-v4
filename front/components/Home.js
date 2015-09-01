var React 			= require('react');
var Router 			= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var PrimaryStats 	= require('./PrimaryStats');
var SecondaryStats 	= require('./SecondaryStats');

var Home = React.createClass({
	mixins: [],
	
	contextTypes: {
    	router: React.PropTypes.func
  	},

	render: function() {
		return (
			<div>
				<PrimaryStats />
				<SecondaryStats />
			</div>
		);
	}
});

module.exports = Home;