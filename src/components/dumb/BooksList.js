import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';
import * as Utils from '../utils';
import {Link} from 'react-router';

export default React.createClass({

	getDefaultProps() {
		return {
			books: Immutable.List([])
		}
	},

	render() {
	
		let books = _.chunk(this.props.books.toArray(), Math.ceil(this.props.books.count() / 2));
		return (

			<div>
				<div className="data-list">
					{books.map((set, i) => {
						return (
							<ul key={i}>
								{set.map(book => {
									return(<li key={book.id}>{this.getViewBookLink(book)} {this.getEditBookLink(book)}</li>)
								})}
							</ul>
						)

					})}
				</div>
			</div>
		);
	},

	getViewBookLink(book) {
		return (
			<Link className={classNames({'is-read': book.is_read})} to={"/book/" + book.id} onClick={this.loadBookInfo.bind(this, book.id)}>{book.title}</Link>
		)
	},

	getEditBookLink(book) {
		if (Utils.isLoggedIn() ) {
			return (
				<Link key={"edit-" + book.id} to={"/book/" + book.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
			)
		}
	},

	loadBookInfo(bookId, e) {
		if (this.props.enableEvent) {
			this.props.loadBookInfo(bookId);

			e.preventDefault();
		}
	}
});