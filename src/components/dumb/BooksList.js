import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
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

		return (
			<div>
				<div className="data-list">
					{books.map(set => {
						return (
							<ul>
								{set.map(book => {
									return(<li key={book.id}><a className={classNames({'is-read': book.is_read})} href="#">{book.title}</a></li>)
								})}
							</ul>
						)

					})}
				</div>
			</div>
		);
	},


});