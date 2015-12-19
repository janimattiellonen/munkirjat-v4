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
		return (
			<div className="component" id="single-book">

				<BookInfoView book={this.props.book} singleMode={true} />
			</div>
		);
	},

	componentDidMount() {
		this.props.bookActions.fetchBookInfo(this.props.params.id);	
	},

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.book.id == null;
	}

});
