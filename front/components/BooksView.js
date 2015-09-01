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
	mixins: [FluxMixin, StoreWatchMixin("BookStore")],

	contextTypes: {
    	router: React.PropTypes.func
  	},

	getInitialState: function() {
		return {
	
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("BookStore").getState()
	},

	componentDidMount: function() {

		console.log("luss");
return;
		var path = this.getPathname();

		if (path == "/books") {
			this.getFlux().actions.book.loadAllBooks();
			this.title = "books";
		} else if (path == "/books/unread") {
			this.getFlux().actions.book.loadUnreadBooks();
			this.title = "unreadBooks";
		}
	},

	render: function() {
		return (
			<div>
				<h1><Translate content={this.title} /></h1>
				<BookList books={this.state.books} />
			</div>
		);
	},
});

module.exports = BooksView;