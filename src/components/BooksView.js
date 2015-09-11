import React from 'react';
import BookList	from './BookList';
import Immutable from 'immutable';
import Translate from 'react-translate-component';
//import Router from 'react-router';

export default class BooksView extends React.Component {

	constructor(props, context){
    	super(props);
    	console.log("CTOR: " + context.router); // will work
    	this.context = context;
    	this.state = props;
    	this.props = props;
    	console.log(JSON.stringify(props));
  	}

	componentDidMount() {
		//var path = this.getPathname();
		//var path = this.state.getPathname();
		console.log("PATH: " + this.props.location.pathname);
	/*		
		if (path == "/books") {
			this.getFlux().actions.book.loadAllBooks();
			this.title = "books";
		} else if (path == "/books/unread") {
			this.getFlux().actions.book.loadUnreadBooks();
			this.title = "unreadBooks";
		}
		*/
	}

	render() {

		return (
			<div>
				<h1><Translate content={this.title} /></h1>
				
			</div>
		);
	}
};

BooksView.contextTypes = {
  router: React.PropTypes.object.isRequired
};