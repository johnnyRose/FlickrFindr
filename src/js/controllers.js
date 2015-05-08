angular.module('FlickrFindr.controllers', [])
.controller('photosController', ["$scope", "flickrService", function($scope, flickrService) {
	window.jsonFlickrApi = function(response) {
		$scope.photosList = response.photos.photo;
	}
	flickrService.getPhotos();
}])

.controller('photoDetailsController', ["$scope", "$routeParams", 'localStorageManager', function($scope, $routeParams, localStorageManager) {
	$scope.routeParams = $routeParams;
	$scope.toggle = function(f, s, i, sec) {	
		localStorageManager.getFlickrFindrStorage(f, s, i, sec);
		localStorageManager.toggle();
	};
}]);