    module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9001,
                    index: 'index.html'
                }
            }
        },

        sass: {
            options: {
                loadPath: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            grunt: {
                files: ["Gruntfile.js"],
                tasks: ["default"],
                options: {
                  livereload: true
                }
            },

            sass: {
                files: ["scss/**/*.scss"],
                tasks: ["buildCss"],
                options: {
                  livereload: true
                }
            },

            script: {
                files: 'develop/js/**/*.js',
                tasks: ['buildJs'],
                options: {
                  livereload: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },

            script: {
                src: [
                    'bower_components/foundation/js/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.alert.js',
                    'bower_components/foundation/js/foundation/foundation.abide.js',
                    'bower_components/foundation/js/foundation/foundation.joyride.js',
                    'js/develop/script.js'
                ],
                dest: 'js/assets/script.js'
            },

            modernizr: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'js/develop/custom.modernizr.js'
                ],
                dest: 'js/assets/modernizr.js'
            }
        },

        // --------------------------------------
        // Uglify Configuration
        // --------------------------------------

        uglify: {
            dist: {
                files: {
                    'js/assets/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
                    'js/assets/modernizr.min.js': ['js/assets/modernizr.js'],
                    'js/assets/script.min.js': ['js/assets/script.js']
                }
            }
        }
    });

    // -----------------------------------------
    // Load Grunt tasks
    // -----------------------------------------

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // -----------------------------------------
    // Register Grunt tasks
    // -----------------------------------------

    grunt.registerTask('buildCss', ['sass']);
    grunt.registerTask('buildJs', ['concat', 'uglify']);
    grunt.registerTask('default', ['buildCss', 'buildJs', 'connect', 'watch']);
};
