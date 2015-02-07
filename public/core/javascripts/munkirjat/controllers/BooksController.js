app.controller('BooksController', ['$rootScope', '$scope', '$stateParams', '$state', '$route', '$location', 'Books',
    function BooksController($rootScope, $scope, $stateParams, $state, $route, $location, Books) {
        Books.query({
            mode: $stateParams.state,
        }, function(books) {
            $scope.books = Munkirjat.ArrayUtils.chunk(books, 25);
        });
    }]);