import React from 'react';
import Immutable from 'immutable';
import _ from "lodash";

export default React.createClass({

	render() {

		//let authors = _.chunk(this.props.authors.toArray(), Math.ceil(this.props.authors.count() / 2));

		const {authors} = this.props;

		return (
			<div className="component">
				<h1>Authors</h1>
				<div className="data-list">
					<ul>
					{authors.map(author => {
						return(<li key={author.id}><a href={"/#/author/" + author.id}>{author.name} ({author.amount})</a></li>)	
					})}
					</ul>
				</div>
			</div>
		);
	},

	componentDidMount() {
		//this.props.fetchAuthors();
	}
});
