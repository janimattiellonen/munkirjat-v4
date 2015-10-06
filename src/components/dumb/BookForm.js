import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Button, ButtonGroup} from 'react-bootstrap';

function bookValidation(data) {
    const errors = {};
    
    return errors;
}

@connectReduxForm({
	form: 'book',
	fields: [
		'title', 
		'pageCount'
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

    render() {
    	const {
      		fields: {
	      		title, 
	      		pageCount
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

    	return (
			<div className="component">
				<h1>New Book</h1>
				<form className="form-horizontal" onSubmit={handleSubmit}>
					{renderInput(title, 'Title')}
					
					<div className="form-group">
				    	<label className="col-sm-2">Language</label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option1"  value="fi" autoComplete="off" />
						  		Finnish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option2" value="se" autoComplete="off" />
						  		Swedish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="languageId" id="option3"  value="en" autoComplete="off" />
						  		English
						  	</label>
						</div>	    
				    </div>

					{renderInput(pageCount, 'Page count')}

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