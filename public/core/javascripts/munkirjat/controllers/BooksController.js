app.controller('BooksController', ['$rootScope', '$scope', '$stateParams', '$state', 'Books',
    function BooksController($rootScope, $scope, $stateParams, $state, Books) {

        Books.query({}, function(books) {

            function chunk(src, chunkSize) {
                var arr = [];

                for (var i = 0; i < src.length; i += chunkSize) {
                    arr.push(src.slice(i, i + chunkSize));
                }

                return arr;
            }

            $scope.books = chunk(books, 25);

        });

    }]);