'use strict';

var app = angular.module('munkirjat', [
   'ngRoute',                                 
   'ngResource',
   'ui.router',
   'pascalprecht.translate',
   'ngSanitize',
   'ui.select'
]), permissionList;

app.config(function($httpProvider) {
	$httpProvider.responseInterceptors.push('securityInterceptor');
}).provider('securityInterceptor', function() {
	this.$get = function($location, $q) {
        return function(promise) {
          	return promise.then(null, function(response) {

            	if(response.status === 403 || response.status === 401) {
              		$location.path('/login');
            	}
            	return $q.reject(response);
          	});
        };
    };
 });

var permissionList;
app.run(function(permissions) {
  permissions.setPermissions(permissionList)
});

angular.element(document).ready(function() {
  $.get('/privileges', function(data) {
    permissionList = data;
    angular.bootstrap(document, ['munkirjat']);
  });
});

angular.module('munkirjat')
  .factory('permissions', function ($rootScope) {
    var permissionList;
    return {
      setPermissions: function(permissions) {
        permissionList = permissions;

        $rootScope.$broadcast('permissionsChanged')
      },
      hasPermission: function (permission) {
        permission = permission.trim();
        return _.some(permissionList, function(item) {
          if(_.isString(item))
            return item.trim() === permission
        });
      }
   };
});


app.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		bookCount: 			'Books in bookshelf',
		readPageCount: 		'Pages read so far',
		fastestReadTime: 	'Fastest read time',
		pageCount: 			'Pages in the bookshelf',
		moneySpent: 		'money spent on books',
		books:				"{{books}} books",
		avgBookPrice: 		'Average book price',
		avgReadTime: 		'Average read time',
		timeToReadAll: 		'Estimated time to read all unread books',
		slowestReadTime: 	'Slowest read time',
		authorCount: 		'Authors in bookshelf',
		unreadBookCount:	'Unread books',
		currentlyReading:	'Currently reading',
		latestRead:			'Latest read book',
		latestAdded:		'Latest added books',
		favouriteAuthors:	'Favourite authors',
		recentlyRead:		'Recently read books',
		unread:				'Unread books',
		formAuthorFirstname:	'Firstname',
		formAuthorLastname:		'Lastname',
		formAuthorSave:		'Save',
		bookBy:				'by',
		formBookTitle:		'Title',
		formBookPageCount:	'Page count',
		formBookAuthors:	'Authors',
		formBookPrice:		'Price',
		formBookIsRead:		'Is read',
		formBookIsbn:		'Isbn',
		formStartedReading:	'Started reading',
		formFinishedReading:'Finished reading',
		formStartReading:	'Start reading',
		formFinishReading:	'Finish reading',
		formBookLanguage:	'Language',
		formBookFinnish:	'Finnish',	
		formBookSwedish:	'Swedish',	
		formBookEnglish:	'English',	
		formBookSave:		'Save',
		formLoginUsername:	'Username',
		formLoginPassword:	'Password',
		formLoginLogin:		'Login',
		fi: 				'Finnish',
		se:					'Swedish',
		en:					'English',
		yes:				'Yes',
		no:					'No'
	});
	  
	$translateProvider.preferredLanguage('en');
});

app.controller('Ctrl', function ($scope, $translate) {
	  $scope.changeLanguage = function (key) {
		  
	    $translate.use(key);
	  };
	});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    	$stateProvider
	    	.state('home', {
	    		url: '',
	            templateUrl: '/templates/home'
	        }).state('about', {
        		url: '/about',
                templateUrl: '/templates/about'
            }).state('login', {
        		url: '/login',
                templateUrl: '/templates/login'
            }).state('new-author', {
        		url: '/new-author',
                templateUrl: '/templates/author-form',
                controller: 'AuthorController'
            }).state('edit-author', {
        		url: '/author/:authorId',
                templateUrl: '/templates/author-form',
                controller: 'AuthorController'
            }).state('new-book', {
        		url: '/new-book',
                templateUrl: '/templates/book-form',
                controller: 'BookController'
            }).state('view-book', {
				url: '/book/:bookId',
				templateUrl: '/templates/view-book',
				controller: 'BookController'
			}).state('edit-book', {
        		url: '/book/:bookId/edit',
                templateUrl: '/templates/book-form',
                controller: 'BookController'
            });
}]);

app.factory('Stats', ['$resource', function($resource) {
    return $resource('/stats', 
    	{}, 
    	{
    		query: { method: 'GET', isArray: true },
    		currentlyReading: { method: 'GET', url: '/stats/currently-reading', isArray: true},
    		latestRead: { method: 'GET', url: '/stats/latest-read', isArray: true},
    		latestAdded: { method: 'GET', url: '/stats/latest-added', isArray: true },
    		favouriteAuthors: { method: 'GET', url: '/stats/favourite-authors', isArray: true },
    		recentlyRead: { method: 'GET', url: '/stats/recently-read', isArray: true},
    		unread: { method: 'GET', url: '/stats/unread', isArray: true}
    	}
    );
}]);

app.factory('Authors', ['$resource', function($resource) {
	return $resource('/authors/:authorId', 
			{authorId: '@id'},
			{
				save: { method: 'POST', isArray: true},
				update: { method: 'PUT', params: {authorId: '@id'}, isArray: true},
			}
		);
}]);

app.factory('Books', ['$resource', function($resource) {
	return $resource('/books/:bookId', 
			{bookId: '@id'},
			{
				save: { method: 'POST', isArray: true},
				update: { method: 'PUT', params: {bookId: '@id'}, isArray: true},
			}
		);
}]);


app.filter('price', function() {
    var priceFilter = function(input) {

    	numeral.language('en', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b',
                trillion: 't'
            },
            currency: {
                symbol: '€'
            }
        });

    	numeral.language('en');
        return numeral(100.00).format('0.00 $');
    };

    return priceFilter;
});