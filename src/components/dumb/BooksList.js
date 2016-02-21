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
		let self = this;

		return (

			<div>
				<div className="data-list">
					{books.map((set, i) => {
						return (
							<ul key={i}>
								{set.map(book => {
									return(<li key={book.id}>{self.getViewBookLink(book)} {self.getEditBookLink(book)}</li>)
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
			<Link className={classNames({'is-read': book.is_read})} to={"/book/" + book.id} onClick={this.getOnClickEvent(book)}>{book.title}</Link>
		)
	},

	getEditBookLink(book) {
		if (Utils.isLoggedIn() ) {
			return (
				<Link key={"edit-" + book.id} to={"/book/" + book.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
			)
		}
	},

	getOnClickEvent(book) {

		let onClickEvent = function (book, e) {
			if (this.props.bookSelectionCallback) {
				e.preventDefault();
				this.props.bookSelectionCallback(book);
			}
		};

		if (this.props.bookSelectionCallback) {
			return onClickEvent.bind(this, book);
		}

		return null;
	}
});