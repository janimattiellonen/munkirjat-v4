var React 		= require('react');

var BookColumn = React.createClass({

	render: function() {

		return (
			<div>
				<ul>
					{this.props.books.map(function(book) {
						return <li><a href={"#/book/" + book.id }>{book.title}</a></li>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = BookColumn;