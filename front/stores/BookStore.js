var Fluxxor = require('fluxxor');
var Immutable = require('immutable');
var constants = require('../constants');

var BookStore = Fluxxor.createStore({
  
  	initialize: function() {
    		this.books = Immutable.List([]);
        this.book = {
            id: undefined,
            title: undefined,
            authors: Immutable.List([])
        }

    		this.bindActions(
           constants.BOOKS_LOADED, this.onLoadBooks,
           constants.BOOK_LOADED, this.onLoadBook
    		);
  	},

    onLoadBook: function(book) {
      book.authors = Immutable.List(book.authors);
        this.book = book;
        this.emit("change");
    },

    onLoadBooks: function(books) {
        this.books = Immutable.List(books);
        this.emit("change");
    },

  	getState: function() {

        return {
            books: this.books,
            book: this.book
  		  }
  	}
});

module.exports = BookStore;