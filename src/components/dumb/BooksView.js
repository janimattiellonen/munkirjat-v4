import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';

export default React.createClass({

	getInitialState() {
		return {
			mode: undefined
		}
	},

	render() {
		
		return (
			<div>
				<h1>Books</h1>

				<ul>
					{this.props.books.map(book => {
						return(<li key={book.id}><a href="#">{book.title}</a></li>)
					})}
				</ul>
			</div>
		);
	},



	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate() called");
	},

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps() called");
	},

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.params.mode != nextProps.params.mode;
	},

	componentWillUpdate(nextProps, nextState) {
		if (this.props.params.mode != nextProps.params.mode) {
			this.props.fetchBooks(nextProps.params.mode);
		}
	},

	componentDidMount() {
		this.props.fetchBooks(this.props.params.mode);
		this.setState({
			mode: this.props.params.mode
		});
	}
});
