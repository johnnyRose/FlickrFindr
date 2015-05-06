angular.module('csc590FinalProject.services', [])
.factory('flickrService', ["$http", function($http) {
	
	var flickrService = { };
	
	flickrService.getPhotos = function() {
		return $http({
			method: 'JSONP',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=85c26979a45e0709832bbe468f052256&per_page=500&format=json'
		});		
	};
	
	return flickrService;
	
}]);