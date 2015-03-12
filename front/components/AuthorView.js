var React 				= require('react');
var Router 				= require('react-router');
var RouteHandler 		= Router.RouteHandler;
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;
var BookList			= require('./BookList');
var Immutable 			= require('Immutable');
var Translate   		= require('react-translate-component');

var AuthorView = React.createClass({
	mixins: [Router.State, FluxMixin, StoreWatchMixin("AuthorStore")],

	getInitialState: function() {
		return {
			id: undefined,
			firstname: "",
			lastname: ""
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("AuthorStore").getState()
	},

	componentDidMount: function() {
		this.setState({
			author: {
				id: undefined,
				firstname: "",
				lastname: "",
				books: Immutable.List([])
			}
		})
		var authorId = this.getParams().id;

		if(authorId != undefined) {
			this.getFlux().actions.author.loadAuthor(authorId);
		}
	},

	render: function() {
		return (
			<div>
				<h1>{this.state.author.firstname + " " + this.state.author.lastname}</h1>

				<p><a href={"#/author/" + this.state.author.id + "/edit"}><Translate content="edit" /></a></p>

				<BookList books={this.state.author.books} />
			</div>
		);
	}
});

module.exports = AuthorView;