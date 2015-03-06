var React 				= require('react');
var Router 				= require('react-router');
var RouteHandler 		= Router.RouteHandler;
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;
var BookList			= require('./BookList');
var Immutable 			= require('Immutable');
var Translate   		= require('react-translate-component');

var BooksView = React.createClass({
	mixins: [Router.State, FluxMixin, StoreWatchMixin("BookStore")],

	getInitialState: function() {
		return {
	
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("BookStore").getState()
	},

	componentDidMount: function() {
		this.getFlux().actions.book.loadBooks();
	},

	render: function() {
		return (
			<div>
				<h1><Translate content="books" /></h1>
				<BookList books={this.state.books} />
			</div>
		);
	}
});

module.exports = BooksView;