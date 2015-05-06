module.exports = function(grunt) {

  grunt.initConfig({
	  
    pkg: grunt.file.readJSON('package.json'),
	
    uglify: {
      options: {
        banner: '/*! John Rosewicz - <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
	
	concat: {
		options: {
			banner: '/*! John Rosewicz - <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		dist: {
			src: ['node_modules/angular/angular.min.js', 'build/<%= pkg.name %>.min.js'],
			dest: 'build/<%= pkg.name %>.min.js',
		},
	},
	
	connect: {
		'dev-server': {
			options: {
				keepalive: true
			}
		}
	}
	
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['uglify', 'concat', 'connect:dev-server']);
  
};