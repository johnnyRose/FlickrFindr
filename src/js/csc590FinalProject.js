angular.module('csc590FinalProject', [
	'ngRoute',
	'csc590FinalProject.controllers',
	'csc590FinalProject.services'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: 'partials/photos.html', controller: 'photosController' }).
		when('/:farm/:server/:id/:secret', { templateUrl: 'partials/details.html', controller: 'photoDetailsController' }).
		otherwise({ redirectTo: '/' });
}]);