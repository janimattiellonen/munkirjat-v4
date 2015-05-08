var Fluxxor = require('fluxxor');
var Immutable = require('immutable');
var constants = require('../constants');

var AuthorStore = Fluxxor.createStore({
  
  	initialize: function() {
    		this.author = {
            id: null,
            firstname: null,
            lastname: null,
            books: Immutable.List([])
        };

        this.authors = Immutable.List([]);

    		this.bindActions(
    			 constants.SAVE_AUTHOR, this.onSaveAuthor,
           constants.AUTHOR_LOADED, this.onLoadAuthor,
           constants.AUTHORS_LOADED, this.onLoadAuthors
    		);
  	},

  	onSaveAuthor: function(author) {
  		  this.author = author;
        this.emit("change");
  	},

    onLoadAuthor: function(author) {
        this.author = author;
        this.author.books = Immutable.List(this.author.books);

        this.emit("change");
    },

    onLoadAuthors: function(authors) {
        this.authors = Immutable.List(authors);
        this.emit("change");
    },

  	getState: function() {
        return {
            author: this.author,
            authors: this.authors
  		  }
  	}
});

module.exports = AuthorStore;