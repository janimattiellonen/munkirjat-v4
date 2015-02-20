var React 				= require('react');
var Translate   		= require('react-translate-component');
var Router 				= require('react-router');

var AuthorForm = React.createClass({
	mixins: [Router.State],
	render: function() {
			console.log("AuthorForm");

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
				    		<button type="button" className="btn btn-primary"></button>	
				    	</div>
				    </div>	    
				</form>
			</div>
		);
	}

});

module.exports = AuthorForm;