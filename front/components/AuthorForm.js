var React 				= require('react');
var Translate   		= require('react-translate-component');
var Router 				= require('react-router');
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;

var AuthorForm = React.createClass({
	mixins: [Router.State, FluxMixin, StoreWatchMixin("AuthorStore")],

	getInitialState: function() {

		return {
			id: undefined,
			firstname: "",
			lastname: ""
		};
	},

	getStateFromFlux: function() {
		console.log("getStateFromFlux called");
		var flux = this.getFlux();	

		var state2 = flux.store("AuthorStore").getState()

		console.log("STATE: " + JSON.stringify(state2));
		return state2;
	},

	componentDidMount: function() {
		var authorId = this.getParams().id;

		this.getFlux().actions.author.loadAuthor(authorId);
	},

	render: function() {
		console.log("Rendering AuthorForm");
		return (

			<div id="author-creation">
				<form onSubmit={this.saveAuthor}>
					<div className="form-group">
				        <label htmlFor="inputFirstname" className="col-sm-3 control-label"><Translate content="formAuthorFirstname" /></label>
				        <div className="col-sm-9">
				          	<input 	type="text" 
				          			value={this.state.author.firstname} 
				          			onChange={this.handleFirstnameChange} 
				          			name="firstname" 
				          			className="form-control" 
				          			id="inputFirstname" 
				          			placeholder="Firstname" />
				        </div>
				    </div>
				    
			   		<div className="form-group">
				        <label htmlFor="inputLastname" className="col-sm-3 control-label"><Translate content="formAuthorLastname" /></label>
				        <div className="col-sm-9">
				          	<input 	type="text" 
				          			value={this.state.author.lastname} 
				          			onChange={this.handleLastnameChange} 
				          			name="lastname" 
				          			className="form-control" 
				          			id="inputLastname" 
				          			placeholder="Lastname"  />
				        </div>
				    </div>
				    
				    <div className="form-group">
				    	<div className="col-sm-offset-3 col-sm-9">
				    		<input type="submit" className="btn btn-primary"></input>	
				    	</div>
				    </div>	    
				</form>
			</div>
		);
	},

	handleFirstnameChange: function(e) {
		var state = this.state;
		state.author.firstname = e.target.value;
		this.setState(state);
	},

	handleLastnameChange: function(e) {
		var state = this.state;
		state.author.lastname = e.target.value;
		this.setState(state);
	},

	saveAuthor: function(e) {
		e.preventDefault();

		this.getFlux().actions.author.saveAuthor({
			id: 		this.state.author.id != undefined ? this.state.author.id : undefined,
			firstname: 	this.state.author.firstname,
			lastname: 	this.state.author.lastname
		});
	}

});

module.exports = AuthorForm;