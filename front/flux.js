
var Fluxxor = require('fluxxor');

var constants = require('./constants');
var actions = require('./actions');

var AuthorStore = require('./stores/AuthorStore');
var BookStore = require('./stores/BookStore');

var stores = {
  AuthorStore: new AuthorStore(),
  BookStore: new BookStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("change", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});


module.exports = flux;