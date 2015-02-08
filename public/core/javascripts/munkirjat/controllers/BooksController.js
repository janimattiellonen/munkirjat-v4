app.controller('BooksController', ['$rootScope', '$scope', '$stateParams', '$state', '$route', 'Books',
    function BooksController($rootScope, $scope, $stateParams, $state, $route, Books) {
        Books.query({
            mode: $stateParams.state,
        }, function(books) {
            $scope.books = Munkirjat.ArrayUtils.chunk(books, 25);
        });
    }]);