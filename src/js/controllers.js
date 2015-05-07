angular.module('csc590FinalProject.controllers', [])
.controller('photosController', ["$scope", "flickrService", function($scope, flickrService) {
	
	$scope.photosList = [];
	
	window.jsonFlickrApi = function(response) {
		$scope.photosList = response.photos.photo;
	}
	
	flickrService.getPhotos();
	
}])

.controller('photoDetailsController', ["$scope", "$routeParams", function($scope, $routeParams) {
	
	$scope.routeParams = $routeParams;
	
}]);