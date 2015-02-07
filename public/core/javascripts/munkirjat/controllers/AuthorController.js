app.controller('AuthorController', ['$rootScope', '$scope', '$stateParams', '$state', 'Authors',
    function AuthorController($rootScope, $scope, $stateParams, $state, Authors) {
		var errorizer = new Munkirjat.Errorizer($('#author-creation'), 'form-group', []);
		
        $scope.author = {
        	id:			undefined !== $stateParams.authorId ? $stateParams.authorId : null,
        	firstname: 	"",
        	lastname: 	"",
        	books:       []
        };
        
        $scope.saveAuthor = function() {
        	
        	var method = null !== $scope.author.id ? Authors.update : Authors.save;

            var authorData = {
                id: $scope.author.id,
                firstname: $scope.author.firstname,
                lastname: $scope.author.lastname
            };

        	method(authorData, function(result) {
        	    if (method == Authors.save ) {
        	        $scope.author.id = result[0].id;
        	    }
                Munkirjat.Notifier.success(i18n.t('formAuthorSaved'));
        	}, function(result) {
        		errorizer.errorize(result.data[0].errors);

                if (result.status == "500") {
        		    Munkirjat.Notifier.error(i18n.t('formAuthorFailedSaving'));
                }
        	});
        };
        
        $scope.loadAuthorDetails = function(authorId) {
        	Authors.query({authorId: authorId}, function(data) {
        		$scope.author = data[0];

                $scope.author.books = Munkirjat.ArrayUtils.chunk($scope.author.books, 25);


        	}, function(data) {
        		Munkirjat.Notifier.error(i18n.t('formAuthorFailedLoading'));
        	});
        }
        
        if(undefined !== $stateParams.authorId) {
        	$scope.loadAuthorDetails($stateParams.authorId);
        }
    }]);