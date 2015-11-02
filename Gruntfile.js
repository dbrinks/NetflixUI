module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'public/js/main.js': 'public/js/main.js'
                }
            }
        },
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
                esnext: true,
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
                    baseUrl: 'src/js',
                    dir: 'public/js',
                    removeCombined: true,
                    optimize: 'none',
                    modules: [{
                        name: 'main',
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
                tasks: ['jshint', 'requirejs', 'babel', 'bower'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'jshint', 'requirejs', 'babel', 'bower', 'connect', 'watch']);

};
