import React from 'react';
import Immutable from 'immutable';
import _ from "lodash";

export default React.createClass({

	render() {

		let authors = _.chunk(this.props.authors.toArray(), Math.ceil(this.props.authors.count() / 2));

		return (
			<div className="component">
				<h1>Authors</h1>
				<div className="data-list">
					{authors.map(set => {
						return (
							<ul>
								{set.map(author => {
									return(<li key={author.id}><a href={"/#/author/" + author.id}>{author.name}</a> ({author.amount}) <a href={"/#/author/" + author.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> {this.getRemoveAuthorLink(author)}</li>)
								})}
							</ul>
						)

					})}
				</div>
			</div>
		);
	},

	getRemoveAuthorLink(author) {

		if (author.amount === 0) {
			return (
				<a href="#" onClick={this.onAuthorRemove.bind(this, author.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
			) 
		} else {
			return "";
		}
	},	

	onAuthorRemove(id, e) {
		e.preventDefault();
		this.props.authorActions.removeAuthor(id);
	}	
});
