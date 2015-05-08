angular.module('FlickrFindr.controllers', [])
.controller('photosController', ["$scope", "flickrService", "urlGenerator", function($scope, flickrService, urlGenerator) {
	window.jsonFlickrApi = function(response) {
		$scope.photosList = response.photos.photo;
	}
	flickrService.getPhotos();
	$scope.thumbnailUrl = urlGenerator.getThumbnailUrl;
	$scope.detailsUrl = urlGenerator.getDetailsUrl;
}])

.controller('photoDetailsController', ["$scope", "$routeParams", "urlGenerator", "localStorageManager", function($scope, $routeParams, urlGenerator, localStorageManager) {
	$scope.routeParams = $routeParams;
	$scope.fullImageUrl = urlGenerator.getFullImageUrl;
	$scope.toggle = function(f, s, i, sec) {	
		localStorageManager.getFlickrFindrStorage(f, s, i, sec);
		localStorageManager.toggle();
	};
}]);