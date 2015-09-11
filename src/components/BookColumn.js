var React 		= require('react');

export default React.createClass({

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

