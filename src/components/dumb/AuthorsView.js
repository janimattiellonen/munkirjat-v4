import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from "lodash";

export default React.createClass({

	render() {

		let authors = _.chunk(this.props.authors.toArray(), Math.ceil(this.props.authors.count() / 2));

		return (
			<div>
				<h1>Authors</h1>
				<div className="data-list">
					{authors.map(set => {
						return (
							<ul>
								{set.map(author => {
									return(<li key={author.id}><a href="#">{author.name}</a></li>)
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
	},

	shouldComponentUpdate2(nextProps, nextState) {
		console.log("shouldComponentUpdate: " + (this.props.params.mode != nextProps.params.mode));
		console.log("shouldComponentUpdate: " + (this.state.mode == undefined));

		if (this.props.params.mode != nextProps.params.mode) {
			this.props.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	}
});
