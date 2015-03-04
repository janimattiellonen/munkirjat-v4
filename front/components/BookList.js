var React 		= require('react');

var BookList = React.createClass({

	render: function() {
		return (
			<div>
				<ul>
					{this.props.books.map(function(book) {
						return <li><a href={"#/book/" + book.id }>{book.title}</a></li>
					}).toArray()}
				</ul>
			</div>
		);
	}
});

module.exports = BookList;