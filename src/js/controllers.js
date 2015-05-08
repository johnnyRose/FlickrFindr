angular.module('FlickrFindr.controllers', [])
.controller('photosController', ["$scope", "flickrService", function($scope, flickrService) {
	
	$scope.photosList = [];
	
	window.jsonFlickrApi = function(response) {
		$scope.photosList = response.photos.photo;
	}
	
	flickrService.getPhotos();
	
}])

.controller('photoDetailsController', ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.routeParams = $routeParams;
	$scope.toggle = function(f, s, i, sec) {
		checkLS();
		var flickrFindrStorage = window.localStorage.getItem('flickrFindrStorage');
		flickrFindrStorage = JSON.parse(flickrFindrStorage);
		flickrFindrStorage = flickrFindrStorage.saved;
		
		var found = false;
		
		for (var x = 0; x < flickrFindrStorage.length; ++x) {
			var current = flickrFindrStorage[x];
			if (current.farm == f && current.server == s && current.id == i && current.secret == sec) {
				flickrFindrStorage.splice(x, 1);
				window.localStorage.setItem('flickrFindrStorage', JSON.stringify({ saved: flickrFindrStorage }));
				found = true;
				break;
			} 
		}
		
		if (!found) {
			flickrFindrStorage.push({ farm: f, server: s, id: i, secret: sec });
			window.localStorage.setItem('flickrFindrStorage', JSON.stringify({ saved: flickrFindrStorage }));
		}
		
		console.log(flickrFindrStorage);
	};
	
	function checkLS() {
		if (window.localStorage.getItem('flickrFindrStorage')) {
		} else {
			window.localStorage.setItem('flickrFindrStorage', JSON.stringify({ saved: [] }));
		}
	}
}


]);