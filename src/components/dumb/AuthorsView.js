import React from 'react';
import _ from 'lodash';
import {Button, Modal} from 'react-bootstrap';
import SmartSearch from 'smart-search';
import classNames from 'classnames';
import * as Utils from '../utils';
import {Link} from 'react-router';

export default React.createClass({

	getInitialState() {
		return {
			showModal: false,
			removableId: null,
			searchTerm: '',
			search: false
		}
	},

	close() {
		this.setState({ showModal: false });
	},

	open() {
		this.setState({ showModal: true });
	},

	remove() {
		if (this.state.removableId) {
			this.props.authorActions.removeAuthor(this.state.removableId);
			this.close();
		}
	},

	handleSearch(e) {
		let searchTerm = e.target.value;

		this.setState({
			search: searchTerm.length > 0,
			searchTerm: searchTerm.length > 0 ? searchTerm : ''
		});
	},

	filterAuthors(authors, searchTerm) {
		return Utils.filter(authors, searchTerm, ['firstname', 'lastname']);
	},

	render() {

		let authors = this.props.authors

		if (this.state.search) {
			authors = this.filterAuthors(authors, this.state.searchTerm);
		} 

		authors = _.chunk(authors.toArray(), Math.ceil(this.props.authors.count() / 2));

		return (
			<div className="component">
				<h1>Authors</h1>

				<div className={classNames('sort-box', {'hidden': this.state.search})}>
					<span>Sort by: </span>
					<ul className="horizontal-list">
						<li><a href="#" onClick={this.onSortByAuthorName}>author name</a> | </li>
						<li><a href="#" onClick={this.onSortByBookCount}>book count</a></li>
					</ul>
				</div>

				<div className="search-box">
					<input type="text" value={this.state.searchTerm} onChange={this.handleSearch}/>
				</div>

				<div className="data-list">
					{authors.map((set, i) => {
						return (
							<ul key={i}>
								{set.map(author => {
									return(<li key={author.id}>{this.getViewAuthorLink(author)} ({author.amount}) {this.getEditAuthorLink(author)} {this.getRemoveAuthorLink(author)}</li>)
								})}
							</ul>
						)
					})}
				</div>

				<Modal show={this.state.showModal} onHide={this.close}>
			        <Modal.Header closeButton>
			            <Modal.Title>Remove author</Modal.Title>
			        </Modal.Header>

					<Modal.Body>
			         	<p>Do you really want to remove the selected author?</p>        	
			        </Modal.Body>
		          	<Modal.Footer>
		            	<Button onClick={this.close}>No</Button>
		            	<Button onClick={this.remove}>Yes</Button>
		          	</Modal.Footer>
				</Modal>
			</div>
		);
	},

	getViewAuthorLink(author) {
		return (
			<Link key={'view-' + author.id} to={'/author/' + author.id}>{author.name}</Link>
		)
	},

	getEditAuthorLink(author) {
		if (Utils.isLoggedIn()) {
			return (
				<Link key={'edit-' + author.id} to={'/author/' + author.id + '/edit'} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
			)
		}
	},

	getRemoveAuthorLink(author) {

		if (author.amount === 0 && Utils.isLoggedIn()) {
			return (
				<a href="#" onClick={this.onAuthorRemove.bind(this, author.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
			) 
		} else {
			return '';
		}
	},	

	onAuthorRemove(id, e) {
		e.preventDefault();
		this.setState({ removableId: id });
		this.open();	
	},	

	onSortByBookCount(e) {
		e.preventDefault();
		this.props.authorActions.sortByBookCount();
	},

	onSortByAuthorName(e) {
		e.preventDefault();
		this.props.authorActions.sortByAuthorName();
	}
});


