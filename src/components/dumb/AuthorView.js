import React from 'react';
import Immutable from 'immutable';
import _ from "lodash";
import BooksList from './BooksList';
import BookInfoView from './BookInfoView';

export default React.createClass({

	getInitialState: function() {
        return { showBookInfo: false };
    },

	getDefaultProps() {
		return {
			author: {
				books: Immutable.List([]),
				book: undefined
			}	
		}
	},

	render() {

		const {author, book} = this.props;

		return (
			<div className="component" id="single-author">
				{this.props.children && React.cloneElement(
                    this.props.children,
                    {
                        authorActions: this.props.authorActions,
                        userActions: this.props.userActions,
                        bookActions: this.props.bookActions
                    }
                )}
				<h1>Author</h1>
				{author.name} <a href={"/#/author/" + author.id + "/edit"} ><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>  

				{this.getRemoveAuthorLink()}
				
				<h2>Books</h2>

				<BooksList enableEvent={true} books={author.books} {...this.props}/>
				
                { book ? <BookInfoView book={book} singleMode={false} {...this.props}/> : null }
			</div>
		);
	},

	getRemoveAuthorLink() {
		const {author} = this.props;

		if (!author.books || author.books && author.books.count() == 0) {
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
	},

	componentDidMount() {
		this.props.authorActions.fetchAuthor(this.props.params.id);
	},
});
