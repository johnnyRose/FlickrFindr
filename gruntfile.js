module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
	  
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			dist: {
				files: {			  
					'build/app.js': [
						'src/js/csc590FinalProject.js',
						'src/js/services.js',
						'src/js/controllers.js',
						'src/js/filters.js'
					]
				}
			}
		},
		
		concat: {
			dist: {
				files: {
					'dist/app.js': [
						'node_modules/angular/angular.min.js',
						'node_modules/angular-route/angular-route.min.js',
						'build/app.js'
					]
				}
			}
		},
		
		copy: {
			dist: {
				files: [
					{ expand: true, src: ['csc590FinalProject.html'], dest: 'dist/', cwd: 'src' },
					{ expand: true, src: ['stylesheet.css'], dest: 'dist/', cwd: 'src' }
				]
			}
		},
		
		processhtml: {
			dist: {
				files: [
					{ expand: true, src: ['csc590FinalProject.html'], dest: 'dist/', cwd: 'src' }
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

	grunt.registerTask('default', ['uglify:dist', 'concat:dist', 'copy:dist', 'processhtml:dist' ]);
	grunt.registerTask('dev', ['uglify:dist', 'concat:dist', 'copy:dist', 'processhtml:dist', 'connect:dev-server' ]);
  
};