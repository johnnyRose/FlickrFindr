module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
	  
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			dist: {
				files: {			  
					'build/FlickrFindr.js': [
						'src/js/FlickrFindr.js',
						'src/js/services.js',
						'src/js/controllers.js',
						'src/js/filters.js'
					]
				}
			}
		},
		
		cssmin: {
			dist: {
				files: {
					'dist/FlickrFindr.css' : ['src/stylesheet.css']
				}
			}
		},
				
		
		concat: {
			dist: {
				files: {
					'dist/FlickrFindr.js': [
						'node_modules/angular/angular.min.js',
						'node_modules/angular-route/angular-route.min.js',
						'build/FlickrFindr.js'
					],
					
					'dist/FlickrFindr.css' : [
						'node_modules/bootstrap/dist/css/bootstrap.min.css',
						'dist/FlickrFindr.css'
					]
				}
			}
		},
		
		copy: {
			dist: {
				files: [
					{ expand: true, src: ['index.html'], dest: 'dist/', cwd: 'src' },
					{ expand: true, src: ['partials/explore.html'], dest: 'dist/', cwd: 'src' },
					{ expand: true, src: ['partials/details.html'], dest: 'dist/', cwd: 'src' },
					{ expand: true, src: ['partials/favorites.html'], dest: 'dist/', cwd: 'src' }
				]
			}
		},
		
		processhtml: {
			dist: {
				files: [
					{ expand: true, src: ['index.html'], dest: 'dist/', cwd: 'src' }
				]
			}
		},
		
		connect: {
			'dev-server': {
				options: {
					keepalive: true
				}
			}
		}
		
	});

	grunt.registerTask('default', ['uglify:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'processhtml:dist' ]);
	grunt.registerTask('dev', ['uglify:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'processhtml:dist', 'connect:dev-server' ]);
  
};