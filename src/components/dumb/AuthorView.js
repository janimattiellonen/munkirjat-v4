import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from "lodash";
import BooksList from './BooksList';

export default React.createClass({

	getDefaultProps() {
		return {
			author: {
				brf: 2,
				books: Immutable.List([])
			}	
		}

	},

	render() {
		return (
			<div>
				<h1>Author</h1>
				{this.props.author.name}
				<h2>Books</h2>

				<BooksList books={this.props.author.books} />
			</div>
		);
	},

	componentDidMount() {
		this.props.fetchAuthor(this.props.params.id);
	},
});
