import React from 'react';
import BookList	from './BookList';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

export default class BooksView extends React.Component {

	render() {

		return (
			<div>
				<h1>Books</h1>

	
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchBooks();
	}
};

