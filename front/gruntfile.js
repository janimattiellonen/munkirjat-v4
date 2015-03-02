module.exports = function(grunt) {

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        revision: "r" + process.cwd().split('/').pop(),

        less: {

            common: {
                files: {
                    "web/app.css": [
                        "app.less"
                    ]
                }
            }
        },

        express: {
            options: {
                background: true,
            },
            dev: {
                options: {
                    port: 4002,
                    script: 'server.js'
                }
            },
        },

        watch: {

            less: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },

            jsx: {
                files: ['components/**/*.js', 'app.js', 'actions.js', 'constants.js', 'flux.js', 'stores/*.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            }
        },

        

        browserify: {
            dist: {
                files: {
                    '../public/core/javascripts/munkirjat/react/app.js': ['app.js'],
                },
                options: {
                   
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-express-server');
    grunt.registerTask('css', ['less']);
    grunt.registerTask('default', ['css',  'browserify']);
    grunt.registerTask('server', [ 'express:dev', 'watch' ])
      
};
