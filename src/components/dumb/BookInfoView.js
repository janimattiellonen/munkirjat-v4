import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from 'lodash';
import classNames from 'classnames';

import * as utils from '../utils';

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
			<div className="book-info">
				<h2>{book.title}</h2>

				<div className="row">
					<div className="title">Language</div>
					<div>{utils.language(book.language_id)}</div>
				</div>
				
				<div className="row">
					<div className="title">Price</div>
					<div>{utils.money(book.price)}</div>
				</div>
				
				<div className="row">
					<div className="title">Is read</div>
					<div>{utils.yes_no(book.is_read)}</div>
				</div>


				<div className="row">
					<div className="title">Started reading</div>
					<div>{utils.date_format(book.started_reading)}</div>
				</div>

				<div className="row">
					<div className="title">Finished reading</div>
					<div>{utils.date_format(book.finished_reading)}</div>
				</div>
				
				
			</div>
		);
	},


});