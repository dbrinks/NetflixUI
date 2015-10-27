module.exports = function(grunt) {

  grunt.initConfig({
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
          baseUrl: "src/js",
          dir: "public/js",
          removeCombined: true,
          optimize: "none",
          modules: [
            {
              name: "main",
            }
          ],
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
    watch: {
      css: {
        files: '*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'requirejs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass', 'jshint', 'requirejs', 'watch']);

};
