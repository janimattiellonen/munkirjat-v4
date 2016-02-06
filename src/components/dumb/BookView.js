import React from 'react';
import BookInfoView from './BookInfoView';
import {Link} from 'react-router';

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

		return (
			<div className="component" id="single-book">

				<BookInfoView key={book.id}  book={book} singleMode={true} />
			</div>
		);
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.params.id != null && nextProps.params.id != this.props.params.id) {
			window.dataLayer = window.dataLayer || [];
			dataLayer.push({
				'event' : 'view-book'
			});	

			this.props.bookActions.setSelectedBook(nextProps.params.id);
		}
	},

	componentWillMount() {
		console.log("component will wount: " + this.props.params.id);
		this.props.bookActions.setSelectedBook(this.props.params.id);	
	}
});	
