var React 		= require('react');

var AuthorColumn = React.createClass({

	render: function() {

		return (
			<div>
				<ul>
					{this.props.authors.map(function(author) {
						return <li><a href={"#/author/" + author.id }>{author.firstname + " " + author.lastname + " (" + author.amount + ")"}</a></li>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = AuthorColumn;