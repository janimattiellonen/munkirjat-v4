import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

export default class BooksView extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }

	render() {

		var pathname = this.context.router.getCurrentPathname();
		console.log("pp: " + pathname);
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
		
		//console.log(this.context.router.getCurrentPathname());
		this.props.fetchBooks();
	}
};
