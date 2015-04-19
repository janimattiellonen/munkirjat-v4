var React 				= require('react');
var Translate   		= require('react-translate-component');
var Router 				= require('react-router');
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;


var BookForm = React.createClass({

	getInitialState: function() {
		return {
			book: {
				id: undefined,
				title: ""
			}
		};
	},

	getStateFromFlux: function() {
		return this.getFlux().store("BookStore").getState()
	},

	componentDidMount: function() {

		this.setState({
			book: {
				id: undefined,
				title: undefined
			}
		});

		$(this.refs.authors.getDOMNode()).select2({
			width: "300px",
            minimumInputLength: 2,
            multiple: true,
            allowClear: true,
            ajax: {
                url: "/authors/search",
                dataType: 'json',
                data: function(term, page) {
                    return {
                        q: term
                    }
                },
                results: function(data, page) {
                    return {results: data};
                }
            },

            formatSelection: function(author) {
                return author.firstname + " " + author.lastname;
            },

            formatResult: function(author) {
            	return author.firstname + " " + author.lastname;
            },
            
            initSelection : function (element, callback) {
                var data = [];
                $(element.val().split(",")).each(function () {
                });
            }
		});
	},

	saveBook: function(e) {
		e.preventDefault();

		alert($(this.refs.authors.getDOMNode()).val().split(",") + ", " + this.state.book.title);
	},

	handleTitleChange: function(e) {
		var state = this.state;
		state.book.title = e.target.value;
		this.setState(state);
	},

	render: function() {
		return (
			<div id="book-creation">
				<form onSubmit={this.saveBook}>
					<div className="form-group">
				        <label htmlFor="inputTitle" className="col-sm-3 control-label"><Translate content="formBookTitle" /></label>
				        <div className="col-sm-9">
				          	<input 	type="text" 
				          			name="title" 
				          			className="form-control" 
				          			id="inputTitle" 				          			
				          			value={this.state.book.title} 
				          			onChange={this.handleTitleChange} />
				        </div>
				    </div>

				    <div className="form-group">
				    	<label className="col-sm-3 control-label"><Translate content="formBookLanguage" /></label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option1" value="fi" autoComplete="off"> <Translate content="formBookFinnish" /></input>
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option2" value="se" autoComplete="off"> <Translate content="formBookSwedish" /></input>
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option3" value="en" autoComplete="off"> <Translate content="formBookEnglish" /></input>
						  	</label>
						</div>	    
				    </div>

					<div className="form-group">
				    	<label className="col-sm-3 control-label"><Translate content="formBookAuthors" /></label>
				    
				    	<input type="text" name="authors" id="authors" ref="authors" />
					</div>	

				   	<div className="form-group">
				        <label htmlFor="inputPageCount" className="col-sm-3 control-label"><Translate content="formBookPageCount" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="pageCount" className="form-control" id="inputPageCount" />
				        </div>
				    </div>
				    
				   	<div className="form-group">
				        <label htmlFor="inputPrice" className="col-sm-3 control-label"><Translate content="formBookPrice" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="price" className="form-control" id="inputPrice" />
				        </div>
				    </div>

		    	    <div className="form-group">
				    	<div className="col-sm-offset-3 col-sm-9">
					   	   	<div className="checkbox">
						        <label>
						          <input type="checkbox" name="isRead"/><Translate content="formBookIsRead" />
						        </label>
						    </div>
						</div>    
			      	</div>

				   	<div className="form-group">
				        <label htmlFor="inputStartedReading" className="col-sm-3 control-label"><Translate content="formStartedReading" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="startedReading" className="form-control datepicker" id="inputStartedReading" datepicker />
				          	<p>
				          		<button type="button" className="btn btn-default"><Translate content="formStartReading" /></button>
				          	</p>
				        </div>
				    </div>      	
			      	
				   	<div className="form-group">
				        <label htmlFor="inputFinishedReading" className="col-sm-3 control-label"><Translate content="formFinishedReading" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="finishedReading" className="form-control datepicker" id="inputFinishedReading" datepicker />
				          	<p>
				          		<button type="button" className="btn btn-default"><Translate content="formFinishReading" /></button>
				          	</p>
				        </div>
				    </div>     
			      	
				   	<div className="form-group">
				        <label htmlFor="inputIsbn" className="col-sm-3 control-label"><Translate content="formBookIsbn" /></label>
				        <div className="col-sm-9">
				          	<input type="text" name="isbn" className="form-control" id="inputIsbn" />
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
	}
});

module.exports = BookForm;