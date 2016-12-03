var React 		= require('react');

var ArrayUtils	= require('./ArrayUtils');
var BookColumn	= require('./BookColumn');

export default React.createClass({

	render: function() {

		var books = this.props.books.toArray();
		var booksSplit  = ArrayUtils.chunk(books, Math.ceil(books.count() / 2));

		return (
			<div className="book-list">
				{booksSplit.map(function(books) {
					return <BookColumn books={books} />
				})}
			</div>
		);
	}
});
