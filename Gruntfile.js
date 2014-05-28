module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files: ['Gruntfile.js', 'assets/js/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		uglify: {
			options: {
				banner: '/* Copyright (c) William Langford <%= grunt.template.today("yyyy") %>. Generated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				src: 'assets/js/**/*.js',
				dest: 'build/js/build.min.js'
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"assets/css/build.css": "assets/less/**/*.less"
				}
			}
		},
		cssmin: {
			compress: {
				options: {
					banner: '/* Copyright (c) William Langford <%= grunt.template.today("yyyy") %>. Generated: <%= grunt.template.today("dd-mm-yyyy") %> */'
				},
				files: {
					'build/css/build.min.css': 'assets/css/**/*.css'
				}
			}
		},
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'assets/img/',
						src: ['**/*.jpg'],
						dest: 'build/img/',
						ext: '.jpg'
					},
					{
						expand: true,
						cwd: 'assets/img/',
						src: ['**/*.png'],
						dest: 'build/img/',
						ext: '.png'
					}
				]
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'whjl.co.uk',
					port: 21,
					authKey: 'key1'
				},
				src: './',
				dest: '/var/www/html/testing/',
				exclusions: ['node*', '.git*', '.ftppass']
			}
		},
		shell: {
			production: {
				command: 'git add . && git commit -m "1" && git push origin master'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('build', ['jshint', 'uglify', 'less', 'cssmin', 'imagemin']);
	grunt.registerTask('staging', ['jshint', 'uglify', 'less', 'cssmin', 'imagemin', 'ftp-deploy']);
	grunt.registerTask('production', ['jshint', 'uglify', 'less', 'cssmin', 'imagemin', 'shell:production']);
};