module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {

      options: {
        separator: ';'
      },
      dist: {
        src: ['public/js/**/*.js', '!public/js/add-image.js', '!public/js/auth.js'],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
          },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*.js']
      }
    },

    uglify: {

      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
          },

    jshint: {
      files: [

        'Gruntfile.js',
        'app/**/*.js',
        'public/**/*.js',
        './*.js',
        'spec/**/*.js'
              ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {

      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'public/dist/main.min.css': 'public/css/main.css'
        }
      }
          },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/css/**/*.css',
        tasks: ['cssmin']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
  
  grunt.registerTask('heroku:production', 'build');
};