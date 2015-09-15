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
		
		console.log("luss: " + this.props.params.mode);
		console.log("SIZE: " + this.props.books.size);
		console.log("state. " + this.state.mode);
		console.log("prevState. " + prevState.mode);

		console.log("uu: " + (undefined == this.state.mode));
				/*
		if (this.state.mode != prevState.mode || this.props.books.size == 0) {
			this.props.fetchBooks(this.props.params.mode);
				this.setState({
					mode: this.props.params.mode
				});
		}
		*/


/*
		this.setState({
			mode: this.props.params.mode
		});
*/
	},

	componentDidMount() {
		this.props.fetchBooks(this.props.params.mode);
		this.setState({
			mode: this.props.params.mode
		});
	}
});
