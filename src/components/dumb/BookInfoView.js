import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';

import * as Utils from '../utils';

export default React.createClass({

	getDefaultProps() {
		return {
			book: {
				id: null,
				title: null
			}
		}
	},

	render() {
		const {book} = this.props;
		
		return (
			<div className="book-info col-md-12 component">
				{this.getTitleElement(book)}

				<div>{this.renderAuthors(book)}</div>

				<p>{this.getEditBookLink(book)}</p> 

				<div className="row">
					<div className="title">Language</div>
					<div>{Utils.language(book.language_id)}</div>
				</div>
				
				<div className="row">
					<div className="title">Page count</div>
					<div>{book.page_count}</div>
				</div>

				<div className="row">
					<div className="title">Price</div>
					<div>{Utils.money(book.price)}</div>
				</div>
				
				<div className="row">
					<div className="title">Is read</div>
					<div>{Utils.yes_no(book.is_read)}</div>
				</div>


				<div className="row">
					<div className="title">Started reading</div>
					<div>{Utils.date_format(book.started_reading)}</div>
				</div>

				<div className="row">
					<div className="title">Finished reading</div>
					<div>{Utils.date_format(book.finished_reading)}</div>
				</div>
			</div>
		);
	},

	renderAuthors(book) {
		if (null != book.authors) {
			return (
				<ul>
					{book.authors.map(author => {
						return (
							<li><a className={!this.props.singleMode ? 'hidden' : ''} href={'/#/author/' + author.id}>{author.name}</a></li>	
						)
					})}
				</ul>
			)
		}
	},

	getEditBookLink(book) {
		if (Utils.isLoggedIn() ) {
			return (
				<a key={"edit-" + book.id} href={"/#/book/" + book.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
			)
		}
	},

	getTitleElement(book) {

		if(this.props.singleMode) {
			return (
				<h1>{book.title}</h1>
			);
		} else {
			return (
				<h2>{book.title}</h2>
			);
		}
	}
});