var React 		= require('react');
var Immutable 	= require('immutable');

var LanguagePanel = React.createClass({

	render: function() {
		var self = this;
		return (
			<span>
				{this.props.authors.map(function(author, i){
					return <span><a href={"#/author/" + author.id}>{author.firstname + " " + author.lastname}</a>{(i < self.props.authors.count() - 1 ? ', ' : '')}</span>
				}).toArray()}
			</span>
		);
	},
});

module.exports = LanguagePanel;