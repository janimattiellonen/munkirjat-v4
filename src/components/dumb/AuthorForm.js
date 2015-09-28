import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

function authorValidation(data) {
    const errors = {};
   

    if (!data.firstname ) {
        errors.firstname = "Firstname is required";
    }

    if (!data.lastname ) {
        errors.lastname = "Lastname is required";
    }
    
    return errors;
}


@connectReduxForm({
	form: 'author',
	fields: ['firstname', 'lastname'],
	validate: authorValidation
})
export default class AuthorForm extends Component {
	static propTypes = {
		asyncValidating: PropTypes.bool.isRequired,
		fields: PropTypes.object.isRequired,
		handleBlur: PropTypes.func.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
	} 

	handleSubmit(data, e) {
		data.preventDefault();
		alert(JSON.stringify(e));
	}

    render() {
    	const {
      		fields: {
	      		firstname, 
	      		lastname
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
				<h1>New author</h1>
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					{renderInput(firstname, 'Firstname')}
					{renderInput(lastname, 'Lastname')}
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-success" onSubmit={this.props.handleSubmit(this.handleSubmit)} disabled={invalid}>
								<i className="fa fa-paper-plane"/> Submit
							</button>
						</div>
					</div>
				</form>

			</div>
    	);
  	}	
}