import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from 'lodash';
import classNames from 'classnames';

export default React.createClass({

	getDefaultProps() {
		return {
			book: {
				id: null
			}
		}
	},

	render() {
	
		

		return (
			<div>
				<h1>Book</h1>

				{this.props.book.title}
			</div>
		);
	},


});