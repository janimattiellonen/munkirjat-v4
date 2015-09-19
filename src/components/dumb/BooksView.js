import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
import _ from "lodash";

export default React.createClass({

	getInitialState() {
		return {
			mode: undefined
		}
	},

	render() {

		let books = _.chunk(this.props.books.toArray(), Math.ceil(this.props.books.count() / 2));

		return (
			<div>
				<h1>Books</h1>
				<div className="data-list">
					{books.map(set => {
						return (
							<ul>
								{set.map(book => {
									return(<li key={book.id}><a href="#">{book.title}</a></li>)
								})}
							</ul>
						)

					})}
				</div>
			</div>
		);
	},
	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps() called");
		console.log("componentWillReceiveProps() mode (this.props): " + this.props.params.mode);
		console.log("componentWillReceiveProps() mode (nextProps): " + nextProps.params.mode);
	},

	componentDidMount() {
		console.log("componentDidMount() called");

		this.props.fetchBooks(this.props.params.mode);
	},

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate: " + (this.props.params.mode != nextProps.params.mode));
		console.log("shouldComponentUpdate: " + (this.state.mode == undefined));

		if (this.props.params.mode != nextProps.params.mode) {
			this.props.fetchBooks(nextProps.params.mode);
		}

		return this.props.params.mode != nextProps.params.mode || this.state.mode == undefined;
	},

	componentWillUpdate2(nextProps, nextState) {
		console.log("componentWillUpdate");

		this.props.fetchBooks(nextProps.params.mode);
	},

	componentDidUpdate2(prevProps, prevState) {
		console.log("componentDidUpdate() called");
	}
});
