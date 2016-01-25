import React from 'react';
import BookInfoView from './BookInfoView'
export default React.createClass({

	getDefaultProps() {
		return {
			book: {
				id: null,
				title: null
			}
		}
	},

	render() {
		const {book} = this.props;
		console.log("BOOK: " + book.id);
console.log("INFO: " + JSON.stringify(book));
		return (
			<div className="component" id="single-book">

				<BookInfoView key={book.id}  book={book} singleMode={true} />
			</div>
		);
	},

	componentDidMount() {
		this.props.bookActions.fetchBookInfo(this.props.params.id);	
	}
});
