import React, {Component, PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';
import numeral from 'numeral';
import Immutable, {List, OrderedMap, Seq} from 'immutable';
import Api from '../../api';
import _ from 'underscore';
import jqueryui from 'jquery-ui';

export default class BookForm extends Component {

    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }

	constructor(props) {
		super(props);

		const {book} = this.props;

		this.state = {
			id: book.id,
			title: book.title,
			language: book.language_id,
			authors: this.mapAuthors(book.authors),
			genres: this.mapGenres(book.genres),
			pageCount: book.page_count,
			price: book.price,
			isRead: book.is_read ? book.is_read : false,
			startedReading: book.started_reading ? moment(book.started_reading).format('DD.MM.YYYY') : null,
			finishedReading: book.finished_reading ? moment(book.finished_reading).format('DD.MM.YYYY') : null
		}
	}

	mapAuthors(authors) {
		let items = OrderedMap();

		if (!authors) {
			return items;
		}

		items = authors.map(author => {
			return {value: author.id, label: author.name};
		});

		return items;
	}

	mapGenres(genres) {
		let items = OrderedMap();

		if (!genres) {
			return items;
		}
		
		items = genres.map(genre => {
			return {value: genre.id, label: genre.name};
		});

		return items;
	}

	searchAuthors(input, callback) {
		const {d} = this.props;
		console.log("searchAuthors: " + JSON.stringify(input));
		Api.searchAuthors(input).then(authors => {

			let mapped = List();

			authors.map(author => {
				mapped = mapped.push({
					value: author.id,
					label: author.name,
				})
			});

    		let selections = {options: mapped.toArray()};
			callback(null, selections);
		});
	}

	searchGenres(input, callback) {
		const {d} = this.props;
		console.log("searchGenres: " + JSON.stringify(d));
		Api.searchGenres(input).then(genres => {

			let mapped = List();

			genres.map(genre => {
				mapped = mapped.push({
					value: genre.id,
					label: genre.name,
				})
			});

    		let selections = {options: mapped.toArray()};
			callback(null, selections);
		});
	}	

	getAuthorOptions(input, callback) {	
		var self = this;

	    setTimeout(() => {
	    	self.searchAuthors(input, callback);
	    }, 500);
	}

	getGenreOptions(input, callback) {	
		var self = this;

	    setTimeout(() => {
	    	self.searchGenres(input, callback);
	    }, 500);
	}	

	renderOption(item) {
		return (
			<div>
				<p key={item.value}>
					{item.label}
				</p>
			</div>
		);
	}

	onAuthorChanged(selectionString, selectionObj) {
		this.setState({
			authors: Seq(selectionObj).filter(x => x.value).toArray()
		});
	}

	onGenreChanged(selectionString, selectionObj) {
		this.setState({
			genres: Seq(selectionObj).filter(x => x.value).toArray()
		});
	}

	processForm(e) {
		e.preventDefault();

		let formData = {
			id: this.state.id,
			title: this.state.title,
			authors: this.state.authors.toArray(),
			genres: this.state.genres.toArray(),
			language: this.state.language,
			pageCount: this.state.pageCount,
			price: this.state.price,
			isRead: this.state.isRead,
			startedReading: this.state.startedReading,
			finishedReading: this.state.finishedReading
		};	

		const { handleSubmit} = this.props;

		handleSubmit(formData);
	}

	handleChange(e, name, field) {
		let value = null;

		if (e.target.type == 'checkbox') {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

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

	componentDidMount() {
		let self = this;
		let datePickerConfig = {
			dateFormat: 'dd.mm.yy'
		};

		$('#startedReading').datepicker(datePickerConfig).on('change', function(e) {
			self.handleStartedReadingChange($(this).val());
		});

		$('#finishedReading').datepicker(datePickerConfig).on('change', function(e) {
			self.handleFinishedReadingChange($(this).val());
		});

		if (this.state.startedReading) {
			$('#startedReading').datepicker("setDate", this.state.startedReading);
		}

		if (this.state.finishedReading) {
			$('#finishedReading').datepicker("setDate", this.state.finishedReading);
		}
	}

	shouldComponentUpdate_INACTIVE(nextProps, nextState) {
		return this.state.date != null && this.state.date != nextState.date;
	}

    render() {
    	const renderInput = (value, name, label) =>
		<div className="form-group">
			<label htmlFor={name} className="col-sm-2">{label}</label>
			<div className={'col-sm-8'}>
				<input type="text" className="form-control" name={name} id={name} value={value} onChange={::this.handleChange}/>
			</div>
		</div>;

		let title = this.state.id ? 'Edit Book': 'New Book';

    	return (
			<div className="component">


				<h1>{title}</h1>
				<form className="form-horizontal" onSubmit={::this.processForm}>
					{renderInput(this.state.title, 'title', 'Title')}
					
					<div className="form-group">
				    	<label className="col-sm-2">Language</label>
				    	
						<div className="col-sm-9 btn-group">
							<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option1"  value="fi" autoComplete="off" checked={this.state.language=="fi"} onChange={::this.handleChange} />
						  		Finnish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option2" value="se" autoComplete="off" checked={this.state.language=="se"} onChange={::this.handleChange} />
						  		Swedish
						  	</label>
						  	<label className="btn btn-primary">
						    	<input type="radio" name="language" id="option3"  value="en" autoComplete="off" checked={this.state.language=="en"} onChange={::this.handleChange} />
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
							value={this.state.authors.toArray()}
							asyncOptions={::this.getAuthorOptions}
							optionRenderer={this.renderOption}
							onChange={::this.onAuthorChanged}
						></Select>
				    	</div>
				    </div>

				    <div className="form-group">
				    	<label className="col-sm-2">Genres</label>
				    	<div className={'col-sm-8'}>
						<Select
							valueKey="value"
							labelKey="label"
							name="genres"
							multi={true}
							searchable={true}
							autoload={false}
							cacheAsyncResults={false}
							value={this.state.genres.toArray()}
							asyncOptions={::this.getGenreOptions}
							optionRenderer={this.renderOption}
							onChange={::this.onGenreChanged}
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
							<input type="text"
								id="startedReading"
							    onChange={::this.handleStartedReadingChange}
							/>						
						</div>
					</div>
	
					<div className="form-group">
						<label htmlFor="finishedReading" className="col-sm-2">Finished reading</label>
						<div className={'col-sm-8'}>
							<input type="text"
								id="finishedReading"
							    onChange={::this.handleFinishedReadingChange}
							/>	
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-success" onClick={::this.processForm} >
								 Submit
							</button>
						</div>
					</div>
				</form>
			</div>
    	);
  	}	
}
