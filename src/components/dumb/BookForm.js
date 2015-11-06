import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Button, ButtonGroup} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from "react-select";
import numeral from 'numeral';
import Immutable from 'immutable';
import * as Utils from '../utils';
import Api from "../../api";
import _ from 'underscore';


function bookValidation(data) {
    const errors = {};

    if (!data.title) {
    	errors.title = "Title is required";	
    }

    if (!data.language) {
    	errors.language = "Language is required";	
    }

    if (!data.pageCount) {
    	errors.pageCount = "Page count is required";
    } else if (!Utils.isPositiveInteger(data.pageCount) || data.pageCount == 0) {
		errors.pageCount = "Value must be an integer greater than 0";
	}

	if (!data.price) {
		errors.price = "Price is required";
	} else if (isNaN(parseFloat(data.price))) {
		errors.price = "Not a valid price";
	}

    return errors;
}

export default class BookForm extends Component {
	static defaultProps = {
		fields: {
			title: null,
			language: null,
			authors: null,
			pageCount: 0,
			price: 0,
			isRead: false
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			id: null,
			title: null,
			language: null,
			authors: null,
			pageCount: null,
			price: null,
			isRead: null,
			startedReading: null,
			finishedReading: null
		}
	}

	searchAuthors(input, callback) {
		const {d} = this.props;
		Api.searchAuthors(input).then(authors => {

			let mapped = Immutable.List();

			authors.map(author => {
				mapped = mapped.push({
					value: author.id,
					label: author.name,
				})
			});

    		//let selections = {options: authors.toArray()};
    		let selections = {options: mapped.toArray()};
			callback(null, selections);
		});
	}

	getOptions(input, callback) {	
		var self = this;

	    setTimeout(() => {
	    	self.searchAuthors(input, callback);
	    }, 500);
	}

	changeValue(newValue) {
		let selectedAuthorIds = newValue.split(",");
	}

	renderOption(author) {
		return (
			<div>
				<p key={author.value}>
					{author.label}
				</p>
			</div>
		);
	}

	onAuthorChanged(selectioString, selectionObj) {
		this.setState({
			authors: Immutable.Seq(selectionObj).filter(x => x.value).toArray()
		});
	}

	validateForm(e) {
		e.preventDefault();

		let formData = {
			title: this.state.title,
			authors: this.state.authors,
			language: this.state.language,
			pageCount: this.state.pageCount,
			price: this.state.price,
			isRead: this.state.isRead,
			startedReading: this.state.startedReading,
			finishedReading: this.state.finishedReading
		};

		alert("validateForm(): " + JSON.stringify(formData));
	}

	handleChange(e, name, field) {
		let nextState = {}
		let value = null;

		if (e.target.type == "checkbox") {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

		nextState[e.target.name] = value;

		this.setState({
			[e.target.name]: value
		});
	}

	handleStartedReadingChange(date) {
		this.setState({
			startedReading: date,
		});
	}

	handleFinishedReadingChange(date) {
		this.setState({
			finishedReading: date,
		});
	}	

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.id != nextState.id;
	}

    render() {
    	const {
      		fields: {
	      		title, 
	      		language,
	      		authors,
	      		pageCount,
	      		price,
      		}, 
    	} = this.props;

    	const renderInput = (value, name, label) =>
		<div className="form-group">
			<label htmlFor={name} className="col-sm-2">{label}</label>
			<div className={'col-sm-8'}>
				<input type="text" className="form-control" name={name} id={name} value={value} onChange={::this.handleChange}/>
			</div>
		</div>;

		const {fields} = this.props;

    	return (
			<div className="component">
				<h1>New Book</h1>
				<form className="form-horizontal" onSubmit={::this.validateForm}>
					{renderInput(this.state.title, 'title', 'Title')}
					
					<div className="form-group">
				    	<label className="col-sm-2">Language</label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option1"  value="fi" autoComplete="off" onChange={::this.handleChange} />
						  		Finnish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option2" value="se" autoComplete="off" onChange={::this.handleChange} />
						  		Swedish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option3"  value="en" autoComplete="off" onChange={::this.handleChange} />
						  		English
						  	</label>
						</div>	    
				    </div>

				    <div className="form-group">
				    	<label className="col-sm-2">Authors</label>
				    	<div className={'col-sm-8'}>
						<Select
							valueKey="value"
							labelKey="label"
							name="authors"
							multi={true}
							searchable={true}
							autoload={false}
							cacheAsyncResults={false}
							asyncOptions={::this.getOptions}
							optionRenderer={this.renderOption}
							onChange={::this.onAuthorChanged}
						></Select>
				    	</div>
				    </div>
    				
					{renderInput(this.state.pageCount, 'pageCount', 'Page count')}

					{renderInput(this.state.price, 'price', 'Price')}

					<div className="form-group">
						<label htmlFor="isRead" className="col-sm-2">Is read</label>
						<div className={'col-sm-8'}>
							<input type="checkbox" className="form-control" name="isRead" id="isRead" checked={this.state.isRead} onChange={::this.handleChange}/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="startedReading" className="col-sm-2">Started reading</label>
						<div className={'col-sm-8'}>
							<DatePicker
							    selected={this.state.startedReading}
							    dateFormat="DD.MM.YYYY"
							    onChange={::this.handleStartedReadingChange}
							/>						
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="finishedReading" className="col-sm-2">Finished reading</label>
						<div className={'col-sm-8'}>
							<DatePicker
							    selected={this.state.finishedReading}
							    dateFormat="DD.MM.YYYY"
							    onChange={::this.handleFinishedReadingChange}
							/>	
						</div>
					</div>



					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-success" onClick={::this.validateForm} >
								 Submit
							</button>
						</div>
					</div>
				</form>
			</div>
    	);
  	}	
}