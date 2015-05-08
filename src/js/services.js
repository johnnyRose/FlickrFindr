angular.module('FlickrFindr.services', [])
.factory('flickrService', ["$http", function($http) {
	
	var flickrService = { };
	
	flickrService.getPhotos = function() {
		return $http({
			method: 'JSONP',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=2d73c904cbee3e97e3e08376461710eb&per_page=50&format=json'
		});		
	};
	
	return flickrService;
}])

.factory('localStorageManager', [function() {
	
	var localStorageManager = { };
	
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
		
		console.log(this.savedPhotos);
	};
	
	return localStorageManager;
}]);