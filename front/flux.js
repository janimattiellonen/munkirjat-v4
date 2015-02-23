
var Fluxxor = require('fluxxor');

var constants = require('./constants');
var actions = require('./actions');

var AuthorStore = require('./stores/AuthorStore');

var stores = {
  AuthorStore: new AuthorStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("change", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

module.exports = flux;