var Fluxxor = require('fluxxor');
var Immutable = require('immutable');
var constants = require('../constants');

var BookStore = Fluxxor.createStore({
  
  	initialize: function() {
    		this.books = Immutable.List([]);

    		this.bindActions(
           constants.BOOKS_LOADED, this.onLoadBooks
    		);
  	},

    onLoadBooks: function(books) {
        this.books = Immutable.List(books);
        this.emit("change");
    },

  	getState: function() {

        return {
            books: this.books
  		  }
  	}
});

module.exports = BookStore;