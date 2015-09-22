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
			<div>
				<h1>Book</h1>

				{book.title}

				{utils.language(book.language_id)}

				{book.price}

				{book.is_read}
				<br/>
				{utils.date_format(book.started_reading)}
<br/>
				{utils.date_format(book.finished_reading)}
			</div>
		);
	},


});