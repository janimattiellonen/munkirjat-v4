import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';

export default React.createClass({

	getDefaultProps() {
		return {
			books: Immutable.List([])
		}

	},

	render() {
	
		let books = _.chunk(this.props.books.toArray(), Math.ceil(this.props.books.count() / 2));
		console.log("BooksList::render(): " + this.props.books.count());
		return (

			<div>
				<div className="data-list">
					{books.map(set => {
						return (
							<ul>
								{set.map(book => {
									return(<li key={book.id}><a className={classNames({'is-read': book.is_read})} href={"/#/book/" + book.id} onClick={this.loadBookInfo.bind(this, book.id)}>{book.title}</a></li>)
								})}
							</ul>
						)

					})}
				</div>
			</div>
		);
	},

	loadBookInfo(bookId, e) {
		this.props.bookActions.fetchBookInfo(bookId);	

		console.log("loadBookInfo()");
		if (this.props.enableEvent) {
			e.preventDefault();
		}
	}
});