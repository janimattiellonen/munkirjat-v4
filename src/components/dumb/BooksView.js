import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from 'lodash';

import BooksList from './BooksList';

export default React.createClass({

	getDefaultProps() {
		books: Immutable.List([])
	},

	getInitialState() {
		return {
			mode: undefined
		}
	},

	render() {
		return (
			<div>
				<h1>{this.getTitle()}</h1>
				<BooksList books={this.props.books} />
			</div>
		);
	},

	getTitle() {
		let title = null;

		switch(this.props.params.mode) {
			case 'read': {
				title = 'Read books';
				break;
			}
			case 'unread': {
				title = 'Unread books';
				break;
			}
			default: {
				title = 'Books';
			}
		}

		return title;
	},

	componentDidMount() {
		this.props.fetchBooks(this.props.params.mode);
	},

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.params.mode != nextProps.params.mode) {
			this.props.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	},
});
