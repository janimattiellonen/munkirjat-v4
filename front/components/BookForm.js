var React 				= require('react');
var Translate   		= require('react-translate-component');
var Router 				= require('react-router');
var Fluxxor 			= require('Fluxxor');
var FluxMixin 			= Fluxxor.FluxMixin(React);
var StoreWatchMixin 	= Fluxxor.StoreWatchMixin;
var _					= require('underscore');
var DatePicker 			= require('react-datepicker');

var BookForm = React.createClass({
	mixins: [Router.State, FluxMixin, StoreWatchMixin("BookStore")],

	getStateFromFlux: function() {
		return this.getFlux().store("BookStore").getState()
	},

	componentDidMount: function() {
		var self = this;

		this.setState({
			book: {
				id: undefined,
				title: undefined,
				languageId: undefined,
				authors: [],
				pageCount: undefined,
				price: undefined,
				isRead: false,
				startedReading: undefined,
				finishedReading: undefined,
				isbn: undefined
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
		}).on("change", function(e) {
			self.handleFieldChange(e);
		});
	},

	saveBook: function(e) {
		e.preventDefault();

		var bookData = _.clone(this.state.book);

		bookData.id = this.state.book.id != undefined ? this.state.book.id : undefined;

		if (bookData.startedReading != undefined) {
			bookData.startedReading = moment(bookData.startedReading).format('DD.MM.YYYY');
		}

		if (bookData.finishedReading != undefined) {
			bookData.finishedReading = moment(bookData.finishedReading).format('DD.MM.YYYY');
		}
		
		alert("wut: " + JSON.stringify(bookData));

		this.getFlux().actions.book.saveBook(bookData);
	},

	handleStartingDate: function(date) {
		var state = this.state;
		state.book.startedReading = date;
		this.setState(state);
	},

	clearFinishingDate: function() {
		this.handleFinishingDate(undefined, false);

		var state = this.state;
		state.book.isRead = false;
		this.setState(state);
	},

	handleFinishingDate: function(date, markAsRead) {
		var state = this.state;
		state.book.finishedReading = date;

		if (markAsRead) {
			state.book.isRead = true;
		}

		this.setState(state);
	},

	handleFieldChange: function(e) {
		var state = this.state;
		var fieldName = e.target.getAttribute('name');
		var value = null;

		if (fieldName == 'authors') {
			value = String(e.target.value).split(",");
		} else if (fieldName == 'isRead') {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

		state.book[fieldName] = value;

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
				          			onChange={this.handleFieldChange} />
				        </div>
				    </div>

				    <div className="form-group">
				    	<label className="col-sm-3 control-label"><Translate content="formBookLanguage" /></label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option1" value="fi" onChange={this.handleFieldChange} autoComplete="off"> <Translate content="formBookFinnish" /></input>
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option2" value="se" onChange={this.handleFieldChange} autoComplete="off"> <Translate content="formBookSwedish" /></input>
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option3" value="en" onChange={this.handleFieldChange} autoComplete="off"> <Translate content="formBookEnglish" /></input>
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
				          	<input 	type="text" 
				          			name="pageCount" 
				          			className="form-control" 
				          			id="inputPageCount" 
				          			value={this.state.book.pageCount} 
				          			onChange={this.handleFieldChange}  />
				        </div>
				    </div>
				    
				   	<div className="form-group">
				        <label htmlFor="inputPrice" className="col-sm-3 control-label"><Translate content="formBookPrice" /></label>
				        <div className="col-sm-9">
				          	<input 	type="text" 
				          			name="price" 
				          			className="form-control" 
				          			id="inputPrice" 
				          			value={this.state.book.price}
				          			onChange={this.handleFieldChange} />
				        </div>
				    </div>

		    	    <div className="form-group">
				    	<div className="col-sm-offset-3 col-sm-9">
					   	   	<div className="checkbox">
						        <label>
						          	<input 	type="checkbox" 
						          			name="isRead" 
						          			checked={this.state.book.isRead}
						          			defaultChecked={this.state.book.isRead}
						          			ref="isRead" 
						          			value={this.state.book.isRead}
						          			onChange={this.handleFieldChange}/><Translate content="formBookIsRead" />
						        </label>
						    </div>
						</div>    
			      	</div>

				   	<div className="form-group">
				        <label htmlFor="inputStartedReading" className="col-sm-3 control-label"><Translate content="formStartedReading" /></label>
				        <div className="col-sm-9 date-component">

				        	<DatePicker
						        key="startedReading"
						        dateFormat="DD.MM.YYYY"
						        weekStart="1"
						        selected={this.state.book.startedReading}
						        onChange={this.handleStartingDate}
						        placeholderText="Click to select a date" 
						    />

						    <button type="button" className="btn btn-default btn-clear" onClick={this.handleStartingDate.bind(this, null)}>Clear</button>

				          	<p>
				          		<button type="button" className="btn btn-default btn-clear" onClick={this.handleStartingDate.bind(this, moment())}>
				          			<Translate content="formStartReading" />
				          		</button>
				          	</p>
				        </div>
				    </div>      	
			      	
				   	<div className="form-group">
				        <label htmlFor="inputFinishedReading" className="col-sm-3 control-label"><Translate content="formFinishedReading" /></label>
				        <div className="col-sm-9 date-component">
				        	<DatePicker
						        key="finishedReading"
						        dateFormat="DD.MM.YYYY"
						        weekStart="1"
						        selected={this.state.book.finishedReading}
						        onChange={this.handleFinishingDate}
						        placeholderText="Click to select a date" 
						    />

						    <button type="button" className="btn btn-default btn-clear" onClick={this.clearFinishingDate}>Clear</button>  

						    <p>
				          		<button type="button" className="btn btn-default" onClick={this.handleFinishingDate.bind(this, moment(), true)}>
				          			<Translate content="formFinishReading" />
				          		</button>
				          	</p>
				        </div>
				    </div>     
							      	
				   	<div className="form-group">
				        <label htmlFor="inputIsbn" className="col-sm-3 control-label"><Translate content="formBookIsbn" /></label>
				        <div className="col-sm-9">
				          	<input 	type="text" 
				          			name="isbn" 
				          			className="form-control" 
				          			id="inputIsbn" 
				          			value={this.state.book.isbn}
				          			onChange={this.handleFieldChange}
				          	/>
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