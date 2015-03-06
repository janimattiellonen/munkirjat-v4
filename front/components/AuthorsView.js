var React 				= require('react');
var Router 				= require('react-router');
var RouteHandler 		= Router.RouteHandler;
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;
var AuthorList			= require('./AuthorList');
var Immutable 			= require('Immutable');
var Translate   		= require('react-translate-component');

var AuthorsView = React.createClass({
	mixins: [Router.State, FluxMixin, StoreWatchMixin("AuthorStore")],

	getInitialState: function() {
		return {
	
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("AuthorStore").getState()
	},

	componentDidMount: function() {
		this.getFlux().actions.author.loadAuthors();
	},

	render: function() {
		return (
			<div>
				<h1><Translate content="authors" /></h1>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorsView;