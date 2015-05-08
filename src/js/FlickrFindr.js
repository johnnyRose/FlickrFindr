angular.module('FlickrFindr', [
	'ngRoute',
	'FlickrFindr.controllers',
	'FlickrFindr.services'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: 'partials/explore.html', controller: 'photosController' }).
		when('/:farm/:server/:id/:secret', { templateUrl: 'partials/details.html', controller: 'photoDetailsController' }).
		when('/favorites', { templateUrl: 'partials/favorites.html', controller: 'favoritesController' }).
		when('/about', { templateUrl: 'partials/about.html' }).
		otherwise({ redirectTo: '/' });
}]);