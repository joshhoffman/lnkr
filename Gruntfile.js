module.exports = function(grunt) {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-less',
        'grunt-contrib-watch',
        'grunt-contrib-coffee',
        'grunt-contrib-jshint',
        'grunt-coffeelint',
        'grunt-browserify',
        'grunt-contrib-handlebars'
    ].forEach(function(task) {
            grunt.loadNpmTasks(task);
        });

    var vendors = 'jquery backbone backbone.marionette backbone.localstorage'.split(' ');
    
    var qaFiles = ['qa/**/*.js']
    
    var coffeeScriptCompile = {
        'frontEnd.js': 'frontEnd.coffee',
        'webAPI.js': 'webAPI.coffee',
        'configure/controller.js': 'configure/controller.coffee',
        'configure/config.js': 'configure/config.coffee',
        'APIRoutes/apiRoutes.js': 'APIRoutes/apiRoutes.coffee',
        'APIControllers/linkController.js': 'APIControllers/linkController.coffee',
        'APIControllers/linksController.js': 'APIControllers/linksController.coffee',
        'models/link.js': 'models/link.coffee'
    }

    grunt.initConfig({
        jshint: {
            files: [
                'app/**/*.js',
                'Marionette/**/*.js',
                '!Marionette/apps/links/module.js'
            ],
            tests: {
                options: {
                    '-W030': true
                },
                files: {
                    src: qaFiles
                }
            }
        },
        browserify: {
            options: {
                debug: true
            },
            dev: {
                src: ['app/main.js'],
                dest: 'public/static/bundle.js'
            },
            production: {
                options: {
                    debug: false
                },
                src: ['app/main.js'],
                dest: 'public/static/bundleprod.js'
            },
            marionette: {
                src: ['Marionette/app.js'],
                dest: 'public/static/bundle.js',
                options: {
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    shim: {
                        jquery: {
                            path: 'node_modules/jquery/src/jquery.js',
                            exports: '$'
                        }
                    }
                }
            }
        },
        cafemocha: {
            all: {
                src: 'qa/**/tests-unit*.js',
                options: {ui: 'tdd'}
            }
        },
        coffee: {
            compile: {
                files: coffeeScriptCompile
            }
        },
        coffeelint: {
            options: {
                configFile: 'coffeelint.json'
              },
              app: [
                  '*.coffee',
                  'configure/*.coffee',
                  'APIRoutes/*.coffee',
                  'APIControllers/*.coffee'
              ]
        },
        handlebars: {
            all: {
                files: {
                    "public/static/templates.js": ["public/templates/**/*.hbs"]
                }
            }
        },
        watch: {
            browserify: {
                files: [
                    'app/**/*.js'
                ],
                tasks: [
                    'browserify'
                ]
            },
            maribrowserify: {
                files: [
                    'Marionette/**/*.js',
                    'Marionette/**/*.hbs'
                ],
                tasks: [
                    'browserify:marionette'
                ]
            },
            maricoffee:{
                files: [
                    'Marionette/**/*.coffee',
                    '!Marionette/apps/links/module.js'
                ],
                tasks: [
                    'coffee:marionette',
                    'coffeelint'
                ]
            },
            jshint: {
                files: [
                    'public/qa/**/*.js',
                    'public/js/**/*.js',
                    'app/**/*.js',
                    'Marionette/**/*.js',
                    '!Marionette/apps/links/module.js'
                ],
                tasks: [
                    'jshint'
                ]
            },
            testhint: {
                files: [
                    'qa/**/*.js'
                ],
                tasks: [
                    'jshint:tests'
                ]
            },
            mocha: {
                files: [
                    'app.js',
                    'APIControllers/**/*.js',
                    'APIRoutes/**/*.js',
                    'configure/*.js',
                    'models/*.js',
                    'qa/**/*.js'
                ],
                tasks: [
                    'cafemocha'
                ]
            },
            lessCompile: {
                files: [
                    'static/*.less'
                ],
                tasks: [
                    'less'
                ]
            },
            coffee: {
                files: [
                    '*.coffee',
                    'APIRoutes/*.coffee',
                    'models/*.coffee',
                    'configure/*.coffee',
                    'APIControllers/*.coffee'
                ],
                tasks: [
                    'coffeelint',
                    'coffee'
                ]
            },
            handlebars: {
                files: [
                    'public/templates/**/*.hbs'
                ],
                tasks: [
                    'handlebars'
                ]
            }
        },
        notify: {
            cafemocha: {
                message: 'Mocha done!'
            }
        }
    });

    //grunt.registerTask('default', ['cafemocha', 'jshint', 'less', 'notify:cafemocha'])
    //grunt.registerTask('mari', ['lint', 'coffee:marionette', 'browserify:marionette:app', 'browserify:marionette:vendors'])
    //grunt.registerTask('mari', ['lint', 'browserify:marionette:app', 'browserify:marionette:vendors'])
    grunt.registerTask('mari', ['lint', 'coffee', 'browserify:marionette']);
    grunt.registerTask('compile', ['coffee', 'browserify:dev', 'handlebars', 'cafemocha'])
    grunt.registerTask('lint', ['jshint', 'coffeelint']);
    grunt.registerTask('default', ['lint', 'compile']);

    grunt.registerTask('runFrontEnd', function() {
        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['frontEnd.js', '3000'],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
                grunt.fail.fatal(new Error('nodemon quit'));
            }
        )
    });

    grunt.registerTask('runAPI', function() {
        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['webAPI.js', '5001'],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
                grunt.fail.fatal(new Error('nodemon quit'));
            }
        )
    });

    grunt.registerTask('bbserver', ['lint', 'compile', 'runFrontEnd', 'runAPI', 'watch']);
    grunt.registerTask('mariserver', ['compile', 'mari', 'runFrontEnd', 'runAPI', 'watch']);
}