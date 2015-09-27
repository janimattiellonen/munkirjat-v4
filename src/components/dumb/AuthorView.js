import React from 'react';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
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
		return (
			<div className="component">
				{this.props.children && React.cloneElement(
                    this.props.children,
                    {
                        authorActions: this.props.authorActions,
                        userActions: this.props.userActions,
                        bookActions: this.props.bookActions
                    }
                )}
				<h1>Author</h1>
				{this.props.author.name}
				<h2>Books</h2>

				<BooksList enableEvent={true} books={this.props.author.books} {...this.props}/>
				
                { this.props.book ? <BookInfoView book={this.props.book} {...this.props}/> : null }
			</div>
		);
	},

	componentDidMount() {
		this.props.authorActions.fetchAuthor(this.props.params.id);
	},
});
