module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			all: {
				options: {
					livereload    : true,
					interrupt     : true,
					debounceDelay : 500
				},
				files: ['./sass/**/*.scss'],
				tasks: ['compile']
			}
		},

		sass: {
			all: {
				files: {
					'./public/css/screen.css': './sass/screen.scss'
				}
			}
		},

		express: {
			all: {
				options: {
					port: 8080,
					hostname: '127.0.0.1',
					bases: ['./public/'],
					livereload: true
				}
			}
		},

		open: {
			all: {
				path: 'http://localhost:<%= express.all.options.port%>'
			}
		}

	});

	[
		'grunt-contrib-watch',
		'grunt-express',
		'grunt-sass',
		'grunt-open'
	].forEach(function(item) {
		grunt.loadNpmTasks(item);
	});

	grunt.registerTask('compile', ['sass']);
	grunt.registerTask('dev', ['compile', 'express', 'open', 'watch']);
	grunt.registerTask('run', ['compile', 'express', 'open', 'express-keepalive']);

};