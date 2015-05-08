angular.module('FlickrFindr.services', [])
.factory('flickrService', ["$http", function($http) {
	
	var flickrService = { };
	
	window.pageNumber = 0;
	
	flickrService.getPhotos = function() {
		++window.pageNumber;
		return $http({
			method: 'JSONP',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=2d73c904cbee3e97e3e08376461710eb&page=' + window.pageNumber + '&per_page=50&format=json'
		});		
	};
	
	return flickrService;
}])

.factory('urlGenerator', [function() {
	
	var urlGenerator = { };
	
	urlGenerator.getThumbnailUrl = function(farm, server, id, secret) {
		return "https://farm" + farm.toString() + ".staticflickr.com/" + server.toString() + "/" + id.toString() + "_" + secret + "_q.jpg";
	};
	
	urlGenerator.getFullImageUrl = function(farm, server, id, secret) {
		return "https://farm" + farm.toString() + ".staticflickr.com/" + server.toString() + "/" + id.toString() + "_" + secret + ".jpg";
	};
	
	urlGenerator.getDetailsUrl = function(farm, server, id, secret) {
		return "#/" + farm.toString() + "/" + server.toString() + "/" + id.toString() + "/" + secret;
	};
	
	return urlGenerator;	
}])

.factory('localStorageManager', [function() {
	
	var localStorageManager = { };
	
	localStorageManager.getAllFavorites = function() {
		return JSON.parse(window.localStorage.getItem('flickrFindrStorage')).saved || [];
	}
	
	localStorageManager.getFlickrFindrStorage = function(f, s, i, sec) {
		if (!window.localStorage.getItem('flickrFindrStorage')) {
			window.localStorage.setItem('flickrFindrStorage', JSON.stringify({ saved: [] }));
		}
		
		this.f = f;
		this.s = s;
		this.i = i;
		this.sec = sec;
		this.storage = JSON.parse(window.localStorage.getItem('flickrFindrStorage'));
		this.savedPhotos = this.storage.saved;
	};
	
	localStorageManager.elementExistsAt = function() {
		for (var x = 0; x < this.savedPhotos.length; ++x) {
			if (this.savedPhotos[x].farm == this.f && this.savedPhotos[x].server == this.s && this.savedPhotos[x].id == this.i && this.savedPhotos[x].secret == this.sec) {
				return x;
			}
		}
		return -1;
	};
	
	localStorageManager.elementExists = function(f, s, i, sec) {
		var favorites = JSON.parse(window.localStorage.getItem('flickrFindrStorage')).saved;
		for (var x = 0; x < favorites.length; ++x) {
			if (favorites[x].farm == f && favorites[x].server == s && favorites[x].id == i && favorites[x].secret == sec) {
				return true;
			}
		}
		return false;
	}
	
	localStorageManager.addElement = function() {
		if (this.elementExistsAt() == -1) {
			this.savedPhotos.push({ farm: this.f, server: this.s, id: this.i, secret: this.sec });
			this.storage.saved = this.savedPhotos;
			window.localStorage.setItem('flickrFindrStorage', JSON.stringify(this.storage));
		}
	}
	
	localStorageManager.removeElement = function() {
		var index = this.elementExistsAt();
		if (index >= 0) {
			this.savedPhotos.splice(index, 1);
			this.storage.saved = this.savedPhotos;
			window.localStorage.setItem('flickrFindrStorage', JSON.stringify(this.storage));
		}
	}
	
	localStorageManager.toggle = function() {	
		if (this.elementExistsAt() >= 0) {
			this.removeElement();
		} else {
			this.addElement();
		}
	};
	
	return localStorageManager;
}]);