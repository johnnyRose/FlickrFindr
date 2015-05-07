angular.module('csc590FinalProject.services', [])
.factory('flickrService', ["$http", function($http) {
	
	var flickrService = { };
	
	flickrService.getPhotos = function() {
		return $http({
			method: 'JSONP',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=2d73c904cbee3e97e3e08376461710eb&per_page=500&format=json'
		});		
	};
	
	return flickrService;
}]);