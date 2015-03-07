var React 		= require('react');

var BookColumn = React.createClass({

	render: function() {

		return (
			<div>
				<ul>
					{this.props.books.map(function(book) {
						var className = book.isRead ? "is-read" : "";

						return <li><a className={className} href={"#/book/" + book.id }>{book.title}</a></li>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = BookColumn;