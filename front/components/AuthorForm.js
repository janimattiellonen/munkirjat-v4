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

		};
	},

	getStateFromFlux: function() {
		var flux = this.getFlux();

		return {
			"firstname": "",
			"lastname": ""
		}
	},

	componentDidMount: function() {
		
	},

	render: function() {
		return (

			<div id="author-creation">
				<form>
					<div className="form-group">
				        <label htmlFor="inputFirstname" className="col-sm-3 control-label"><Translate content="formAuthorFirstname" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="firstname" className="form-control" id="inputFirstname" placeholder="Firstname" />
				        </div>
				    </div>
				    
			   		<div className="form-group">
				        <label htmlFor="inputLastname" className="col-sm-3 control-label"><Translate content="formAuthorLastname" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="lastname" className="form-control" id="inputLastname" placeholder="Lastname"  />
				        </div>
				    </div>
				    
				    <div className="form-group">
				    	<div className="col-sm-offset-3 col-sm-9">
				    		<button type="button" className="btn btn-primary" onClick={this.saveAuthor}><Translate content="formAuthorSave" /></button>	
				    	</div>
				    </div>	    
				</form>
			</div>
		);
	},

	saveAuthor: function() {
		this.getFlux().actions.user.saveAuthor({id: 1});
	}

});

module.exports = AuthorForm;