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

@connectReduxForm({
	form: 'book',
	fields: [
		'title', 
		'language',
		'pageCount',
		'price'
	],
	validate: bookValidation
})
export default class BookForm extends Component {
	static propTypes = {
		asyncValidating: PropTypes.bool.isRequired,
		fields: PropTypes.object.isRequired,
		handleBlur: PropTypes.func.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		valid: PropTypes.bool.isRequired
	} 

	searchAuthors(input, callback) {
		const {d} = this.props;
		console.log("lols");
		Api.searchAuthors(input).then(authors => {
			console.log("authors2: " + JSON.stringify(authors.toArray()));


			let mapped = Immutable.List();

			authors.map(author => {
				mapped = mapped.push({
					value: author.id,
					label: author.name,
				})
			});

			console.log("sss: " + mapped.toArray());
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
		console.log("new value: " + newValue);
		//const { courseActions } = this.props;

	    //courseActions.setSelectedCourseId(newValue);
	}

	renderOption(author) {
		console.log("luss: " + JSON.stringify(author));
		return (
			<div>
				<p key={author.value}>
					{author.label}
				</p>
			</div>
		);
	}

    render() {
    	const {
      		fields: {
	      		title, 
	      		language,
	      		pageCount,
	      		price
      		}, 
	      	invalid,
	      	handleSubmit,
	      	valid,
    	} = this.props;

    	const renderInput = (field, label) =>
		<div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
			<label htmlFor={field.name} className="col-sm-2">{label}</label>
			<div className={'col-sm-8'}>
				<input type="text" className="form-control" id={field.name} {...field}/>
			  	{field.error && field.touched && <div className="text-danger">{field.error}</div>}
			</div>
		</div>;

		const {fields} = this.props;

    	return (
			<div className="component">
				<h1>New Book</h1>
				<form className="form-horizontal" onSubmit={handleSubmit}>
					{renderInput(title, 'Title')}
					
					<div className="form-group">
				    	<label className="col-sm-2">Language</label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option1"  value="fi" autoComplete="off" onChange={fields.language.onChange} />
						  		Finnish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option2" value="se" autoComplete="off" onChange={fields.language.onChange} />
						  		Swedish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option3"  value="en" autoComplete="off" onChange={fields.language.onChange} />
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
							onChange={this.changeValue}
						></Select>
				    	</div>
				    </div>
    				

					{renderInput(pageCount, 'Page count')}

					{renderInput(price, 'Price')}

					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-success" onClick={handleSubmit} disabled={invalid}>
								 Submit
							</button>
						</div>
					</div>
				</form>

			</div>
    	);
  	}	
}