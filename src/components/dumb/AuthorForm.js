import React, {Component, PropTypes} from 'react';
import FileForm from './FileForm';
import ReactSwipe from 'react-swipe';

export default class AuthorForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.author.id,
			firstname: this.props.author.firstname,
			lastname: this.props.author.lastname
		}
	}

	handleChange(e, name, field) {
		let nextState = {}
		let value = null;

		if (e.target.type == 'checkbox') {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

		nextState[e.target.name] = value;

		this.setState({
			[e.target.name]: value
		});
	}

	validateForm(e) {
		e.preventDefault();

		const { handleSubmit} = this.props;

		let formData = {
			id: this.state.id,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
		};

		handleSubmit(formData);
	}	

	next() {
    	this.refs.ReactSwipe.swipe.next();
  	}

	prev() {
		this.refs.ReactSwipe.swipe.prev();
	}

	selectedItem(index, elem) {
		alert(index);
	}

    render() {

    	let title = this.state.id ? 'Edit author': 'New author';

    	const {handleFileSubmit} = this.props;

    	const renderInput = (value, name, label) =>
		<div className="form-group">
			<label htmlFor={name} className="col-sm-2">{label}</label>
			<div className={'col-sm-8'}>
				<input type="text" className="form-control" name={name} id={name} value={value} onChange={::this.handleChange}/>
			</div>
		</div>;

    	return (
			<div className="component">
				<h1>{title}</h1>				

				<form className="form-horizontal" onSubmit={::this.validateForm}>
					{renderInput(this.state.firstname, 'firstname', 'Firstname')}
					{renderInput(this.state.lastname, 'lastname', 'Lastname')}
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-success" onClick={::this.validateForm}>
								 Submit
							</button>
						</div>
					</div>
				</form>

				<FileForm handleSubmit={handleFileSubmit}/>

				<ReactSwipe ref="ReactSwipe"
	                continuous={true}
	                callback={this.selectedItem}
	            >
	                <div>'PANE 1'</div>
	                <div>'PANE 2'</div>
	                <div>'PANE 3'</div>
            	</ReactSwipe>

            	<div>
            		<button onClick={::this.prev}>Prev</button>
            		<button onClick={::this.next}>Next</button>
            	</div>
			</div>
    	);
  	}	
}