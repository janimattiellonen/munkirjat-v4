app.controller('AuthorsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Authors',
    function AuthorsController($rootScope, $scope, $stateParams, $state, Authors) {

        $scope.author = {
        	id:			undefined !== $stateParams.authorId ? $stateParams.authorId : null,
        	firstname: 	"",
        	lastname: 	"",
        	books:       []
        };
        
        $scope.loadAuthors = function() {
        	Authors.query({}, function(authors) {
                $scope.authors = Munkirjat.ArrayUtils.chunk(authors, Math.ceil(authors.length / 2));
        	}, function(data) {
        		Munkirjat.Notifier.error(i18n.t('formAuthorsFailedLoading'));
        	});
        }
        
        $scope.loadAuthors();

    }]);