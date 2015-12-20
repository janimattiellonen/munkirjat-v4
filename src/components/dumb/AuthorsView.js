import React from 'react';
import Immutable from 'immutable';
import _ from "lodash";
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({

	getInitialState() {
		return {
			showModal: false,
			removableId: null
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

	render() {

		let authors = _.chunk(this.props.authors.toArray(), Math.ceil(this.props.authors.count() / 2));

		return (
			<div className="component">
				<h1>Authors</h1>

					<span>Sort by: </span>
					<ul className="horizontal-list">
						<li><a href="#" onClick={this.onSortByAuthorName}>author name</a> | </li>
						<li><a href="#" onClick={this.onSortByBookCount}>book count</a></li>
					</ul>
				<br/>	
				<br/>			

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
			<a key={"view-" + author.id} href={"/#/author/" + author.id}>{author.name}</a>
		)
	},

	getEditAuthorLink(author) {
		return (
			<a key={"edit-" + author.id} href={"/#/author/" + author.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
		)
	},

	getRemoveAuthorLink(author) {

		if (author.amount === 0) {
			return (
				<a href="#" onClick={this.onAuthorRemove.bind(this, author.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
			) 
		} else {
			return "";
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


