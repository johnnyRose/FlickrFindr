angular.module('FlickrFindr.controllers', [])
.controller('photosController', ["$scope", "flickrService", "urlGenerator", function($scope, flickrService, urlGenerator) {
	$scope.photosList = [];
	window.jsonFlickrApi = function(response) {
		$scope.photosList = $scope.photosList.concat(response.photos.photo);
	}
	flickrService.getPhotos();
	$scope.thumbnailUrl = urlGenerator.getThumbnailUrl;
	$scope.detailsUrl = urlGenerator.getDetailsUrl;
	$scope.getPhotos = flickrService.getPhotos;
}])

.controller('photoDetailsController', ["$scope", "$routeParams", "urlGenerator", "localStorageManager", function($scope, $routeParams, urlGenerator, localStorageManager) {
	$scope.routeParams = $routeParams;
	$scope.fullImageUrl = urlGenerator.getFullImageUrl;
	$scope.toggle = function(f, s, i, sec) {	
		localStorageManager.getFlickrFindrStorage(f, s, i, sec);
		localStorageManager.toggle();
	};
	$scope.elementExists = localStorageManager.elementExists;
}])

.controller('favoritesController', ["$scope", "urlGenerator", "localStorageManager", function($scope, urlGenerator, localStorageManager) {
	$scope.favorites = localStorageManager.getAllFavorites();
	$scope.thumbnailUrl = urlGenerator.getThumbnailUrl;
	$scope.detailsUrl = urlGenerator.getDetailsUrl;
}]);