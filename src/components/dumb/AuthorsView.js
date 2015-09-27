import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
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
									return(<li key={author.id}><a href={"/#/author/" + author.id}>{author.name} ({author.amount})</a></li>)
								})}
							</ul>
						)
					})}
				</div>
			</div>
		);
	},

	componentDidMount() {
		this.props.fetchAuthors();
	}
});
