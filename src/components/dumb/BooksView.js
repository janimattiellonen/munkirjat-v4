import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

export default class BooksView extends React.Component {

	render() {

		return (
			<div>
				<h1>Books</h1>

				{this.props.books.map(book => {
					return(<div>{book.title}<br/></div>)
				})}
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchBooks();
	}
};
