/**
 * Created by kangaja on 9.6.2016.
 */
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
                files: "features/**/*.js",
                tasks: ["test"],
                options: {
                    interrupt: true
                }
            },
        },
        cucumberjs: {
            src: './features',
            options: {
                steps: "./features/step_definitions"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cucumber');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('test', ['concat','cucumberjs']);
};
