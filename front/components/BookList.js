var React 		= require('react');

var ArrayUtils	= require('./ArrayUtils');
var BookColumn	= require('./BookColumn');

var BookList = React.createClass({

	render: function() {
		var books = this.props.books.toArray();		
		var booksSplit  = ArrayUtils.chunk(books, Math.ceil(books.length / 2));

		return (
			<div className="book-list">
				{booksSplit.map(function(books) {
					return <BookColumn books={books} />
				})}
			</div>
		);
	}
});

module.exports = BookList;