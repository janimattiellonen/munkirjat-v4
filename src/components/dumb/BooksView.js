import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

export default class BooksView extends React.Component {

	render() {

		return (
			<div>
				<h1>Books</h1>

				<ul>
					{this.props.books.map(book => {
						return(<li key={book.id}><a href="#">{book.title}</a></li>)
					})}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchBooks();
	}
};
