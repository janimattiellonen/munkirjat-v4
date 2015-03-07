var BookClient = {

    loadAllBooks: function(successCallback) {
        this.loadBooks('/books', successCallback);
    },

    loadUnreadBooks: function(successCallback) {
        this.loadBooks('/books?mode=unread', successCallback);
    },

    loadBooks: function(url, successCallback) {
        var self = this;

        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
        }).done(function(data) {
            successCallback(data);
        }).error(function(error) {
            alert("Failed to load books");
        });
    }
};

module.exports = BookClient;