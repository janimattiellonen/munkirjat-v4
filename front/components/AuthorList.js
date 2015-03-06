var React 			= require('react');
var ArrayUtils		= require('./ArrayUtils');
var AuthorColumn	= require('./AuthorColumn');

var AuthorList = React.createClass({

	render: function() {

		var authors = this.props.authors.toArray();

		var authorsSplit  = ArrayUtils.chunk(authors, Math.ceil(authors.length / 2));

		return (
			<div className="author-list">
				{authorsSplit.map(function(authors) {
					return <AuthorColumn authors={authors} />
				})}
			</div>
		);
	}
});

module.exports = AuthorList;