var BookClient = {

    loadBook: function(bookId, successCallback) {
        this.load('/books/' + bookId, successCallback);
    },
    
    loadAllBooks: function(successCallback) {
        this.load('/books', successCallback);
    },

    loadUnreadBooks: function(successCallback) {
        this.load('/books?mode=unread', successCallback);
    },

    load: function(url, successCallback) {
        var self = this;

        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
        }).done(function(data) {
            successCallback(data);
        }).error(function(error) {
            alert("Failed to load data");
        });
    }
};

module.exports = BookClient;