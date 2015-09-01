var React 				= require('react');
var Router 				= require('react-router');
var RouteHandler 		= Router.RouteHandler;
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;
var AuthorPanel			= require('./AuthorPanel');
var Immutable 			= require('Immutable');
var Translate   		= require('react-translate-component');
var PriceValue			= require('./PriceValue');
var ChoiceValue			= require('./ChoiceValue');
var DateValue			= require('./DateValue');

var BookView = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin("BookStore")],

	contextTypes: {
    	router: React.PropTypes.func
  	},

	getInitialState: function() {
		return {
			id: undefined,
			title: "",
			languageId: "",
			authors: Immutable.List([])
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("BookStore").getState()
	},

	componentDidMount: function() {
		this.setState({
			book: {
				id: undefined,
				title: "",
				languageId: "",
				authors: Immutable.List([])
			}
		})

		var bookId = this.getParams().id;
		this.getFlux().actions.book.loadBook(bookId);
	},

	render: function() {
		return (
			<div id="book-view">
			    <h1>{this.state.book.title}</h1>

			    <div className="book-info">

			        <div className="row">
			            <div className="title"><Translate content="formBookAuthors" /></div>

			            <div><AuthorPanel authors={this.state.book.authors} /></div>
			        </div>

			        <div className="row">
			            <div className="title"><Translate content="formBookLanguage" /></div>

			            <div><Translate content={this.state.book.languageId} /></div>
			        </div>

			        <div className="row">
			            <div className="title"><Translate content="formBookPrice" /></div>

			            <div><PriceValue price={this.state.book.price} /></div>
			        </div>

			        <div className="row">
			            <div className="title"><Translate content="formBookIsRead" /></div>

			            <div><ChoiceValue state={this.state.book.isRead} /></div>
			        </div>

			        <div className="row">
			            <div className="title"><Translate content="formStartedReading" /></div>

			            <div><DateValue date={this.state.book.startedReading} /></div>
			        </div>

			        <div className="row">
			            <div className="title"><Translate content="formFinishedReading" /></div>

			            <div><DateValue date={this.state.book.finishedReading} /></div>
			        </div>

			    </div>
			</div>
		);
	},
});

module.exports = BookView;