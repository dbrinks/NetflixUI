module.exports = function(grunt) {

    grunt.initConfig({
        bower: {
            dev: {
                dest: 'public',
                js_dest: 'public/js/lib',
                css_dest: 'public/css/lib',
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    document: true,
                    window: true,
                    define: true,
                    require: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    noBuildTxt: true,
                    baseUrl: "src/js",
                    dir: "public/js",
                    removeCombined: true,
                    optimize: "none",
                    modules: [{
                        name: "main",
                    }],
                    useStrict: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css': 'src/scss/main.scss'
                }
            },
        },
	connect: {
            server: {
	        options: {
		    livereload: true,
		    hostname: 'localhost',
		    port: 8888,
		    base: 'public'
		}
	    }
	},
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
		options: {
                    livereload: true
		}
            },
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'requirejs', 'bower'],
		options: {
                    livereload: true
		}
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'jshint', 'requirejs', 'bower', 'connect', 'watch']);

};
