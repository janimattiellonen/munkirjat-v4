app.controller('BooksController', ['$rootScope', '$scope', '$stateParams', '$state', 'Books',
    function BooksController($rootScope, $scope, $stateParams, $state, Books) {

        Books.query({}, function(books) {
            $scope.books = Munkirjat.ArrayUtils.chunk(books, 25);
        });

    }]);