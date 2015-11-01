import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Button, ButtonGroup} from 'react-bootstrap';
import Select from "react-select";
import numeral from 'numeral';
import Immutable from 'immutable';
import * as Utils from '../utils';
import Api from "../../api";


function bookValidation(data) {
    const errors = {};

    if (!data.title) {
    	errors.title = "Title is required";	
    }

    if (!data.language) {
    	console.log("fiuertuiertyiuertiuyter");
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
			price: 0
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			title: null,
			language: null,
			authors: null,
			pageCount: 0,
			price: 0
		}

		console.log("ctor called: " + JSON.stringify(props));
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
			//this.props.courseActions.setCourses(courses, d);
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

	foo(a, b, c) {
		console.log("a: " + JSON.stringify(a));
		console.log("b: " + JSON.stringify(b));
		console.log("c: " + JSON.stringify(c));
	}

	validateForm(e) {
		e.preventDefault();

		let formData = {
			title: this.state.title
		};

		alert("validateForm(): " + JSON.stringify(formData));
	}

	handleChange(e, name, field) {
		console.log(e.target.name + ": " + e.target.value);

		let nextState = {}
		nextState[e.target.name] = e.target.value;

		this.setState({
			[e.target.name]:  e.target.value
		})
	}

    render() {
    	console.log("BookForm::render()");
    	const {
      		fields: {
	      		title, 
	      		language,
	      		authors,
	      		pageCount,
	      		price
      		}, 
    	} = this.props;

    	const renderInput = (value, name, label) =>
		<div className="">
			<label htmlFor={name} className="col-sm-2">{label}</label>
			<div className={'col-sm-8'}>
				<input type="text" className="form-control" name={name} id={name} value={value} onChange={::this.handleChange}/>
			</div>
		</div>;

		const {fields} = this.props;

    	return (
			<div className="component">
				STATE: {this.state.title}
				<h1>New Book</h1>
				<form className="form-horizontal" onSubmit={::this.validateForm}>
					{renderInput(this.state.title, 'title', 'Title')}
					
					<div className="form-group">
				    	<label className="col-sm-2">Language</label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option1"  value="fi" autoComplete="off" />
						  		Finnish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option2" value="se" autoComplete="off" />
						  		Swedish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option3"  value="en" autoComplete="off" />
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
							onChange={::this.foo}
						></Select>
				    	</div>
				    </div>
    				
					{renderInput(fields.pageCount, 'pageCount', 'Page count')}

					{renderInput(fields.price, 'price', 'Price')}

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