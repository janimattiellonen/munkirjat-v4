var Fluxxor = require('fluxxor');
var Immutable = require('immutable');

var constants = require('../constants');

var AuthorStore = Fluxxor.createStore({
  
  	initialize: function() {
    		this.author = {};

    		this.bindActions(
    			 constants.SAVE_AUTHOR, this.onSaveAuthor,
           constants.AUTHOR_LOADED, this.onLoadAuthor
    		);
  	},

  	onSaveAuthor: function(author) {
  		  this.author = author;
        this.emit("change");
  	},

    onLoadAuthor: function(author) {
        console.log("Loaded author: " + JSON.stringify(author));
        this.author = author;
        this.firstname = "Jussi";
        this.emit("change");
    },

  	getState: function() {
        return {
            author: this.author
  		  }
  	}
});

module.exports = AuthorStore;