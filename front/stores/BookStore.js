var Fluxxor = require('fluxxor');
var Immutable = require('immutable');
var constants = require('../constants');

var BookStore = Fluxxor.createStore({
  
  	initialize: function() {
    		this.books = Immutable.List([]);
        this.book = {
            id: null,
            title: null,
            languageId: null,
            authors: Immutable.List([]),
            pageCount: null,
            price: null,
            isRead: false,
            startedReading: null,
            finishedReading: null,
            isbn: null
        };

    		this.bindActions(
            constants.SAVE_BOOK, this.onSaveBook,
            constants.BOOKS_LOADED, this.onLoadBooks,
            constants.BOOK_LOADED, this.onLoadBook
    		);
  	},

    onSaveBook: function(book) {
        this.book = book;
        this.emit("change");
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