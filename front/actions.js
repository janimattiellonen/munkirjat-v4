var constants = require('./constants');

var BookClient = require('./components/BookClient');

var actions = {

	author: {
		saveAuthor: function(author) {

			// handle the ajax query here
			// depending on call success status, call appropriate dispatcher event
			var self = this;
			var method, url;

			if (undefined !== author.id) {
				method = "PUT",
				url = '/authors/' + author.id;
			} else {
				method = "POST";
				url = '/authors';
			}

			$.ajax({
				method: method,
				url: url,
				dataType: 'json',
				data: {
					firstname: 	author.firstname,
					lastname: 	author.lastname
				}
			}).done(function(data) {
				if (method == 'POST') {
					author.id = data[0].id;
				}

				self.dispatch(constants.SAVE_AUTHOR, author);
			}).error(function(error) {
				alert("ERROR: " + JSON.stringify(error));
			});
		},

		loadAuthor: function(authorId) {
			var self = this;

			$.ajax({
				method: 'GET',
				url: '/authors/' + authorId,
				dataType: 'json',
			}).done(function(data) {
				self.dispatch(constants.AUTHOR_LOADED, data[0]);
			}).error(function(error) {

			});
		},

		loadAuthors: function() {
			var self = this;

			$.ajax({
				method: 'GET',
				url: '/authors',
				dataType: 'json',
			}).done(function(data) {
				self.dispatch(constants.AUTHORS_LOADED, data);
			}).error(function(error) {

			});
		}
	},

	book: {
		saveBook: function(book) {
			var self = this;
			var method, url;

			if (undefined !== book.id) {
				method = "PUT",
				url = '/books/' + book.id;
			} else {
				method = "POST";
				url = '/books';
			}

			$.ajax({
				method: method,
				url: url,
				dataType: 'json',
				data: {
					
				}
			}).done(function(data) {
				if (method == 'POST') {
					author.id = data[0].id;
				}

				self.dispatch(constants.SAVE_BOOK, book);
			}).error(function(error) {
				alert("ERROR: " + JSON.stringify(error));
			});
		},

		loadBook: function(bookId) {
			var self = this;
			BookClient.loadBook(bookId, function(data) {
				self.dispatch(constants.BOOK_LOADED, data[0]);
			});
		},

		loadAllBooks: function() {
			var self = this;
			BookClient.loadAllBooks(function(data) {
				self.dispatch(constants.BOOKS_LOADED, data);
			});
		},

		loadUnreadBooks: function() {
			var self = this;
			BookClient.loadUnreadBooks(function(data) {
				self.dispatch(constants.BOOKS_LOADED, data);
			});
		}
	}
};

module.exports = actions;