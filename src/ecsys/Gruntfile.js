/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',
      //+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      //'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      //' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: "src/**/*.js",
        tasks: ["default"],
        options: {
          interrupt: true
        },
      },
      specs: {
        files: "specs/*.js",
        tasks: ["default"],
        options: {
          interrupt: true
        }
      },
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: '_spec',
      },
      all: ['specs/']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Keep the uglify last as it takes more time than others
  // and is not that useful.
  grunt.registerTask('default', ['concat', 'jasmine_node', 'uglify']);
  grunt.registerTask('test', ['concat', 'jasmine_node']);
};
