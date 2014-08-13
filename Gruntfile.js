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

    grunt.initConfig({
        jshint: {
            options: {
                multistr: true
            },
            all: [
                'app/**/*.js',
                'Marionette/**/*.js',
                '!Marionette/apps/links/module.js'
            ]
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
                /*app: {
                    src: ['Marionette/app.js'],
                    dest: 'public/static/app.js',
                    options: {
                        debug: true,
                        extensions: ['.coffee', '.hbs'],
                        transform: ['coffeeify', 'hbsfy'],
                        external: vendors
                    }
                },
                vendors: {
                    files: {
                        'public/static/vendors.js': []
                    },
                    options: {
                        'require': vendors
                    }
                },
                bundle: {*/
                    src: ['Marionette/main.js'],
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
                //}
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
                files: {
                    'frontEnd.js': 'frontEnd.coffee',
                    'webAPI.js': 'webAPI.coffee',
                    'configure/controller.js': 'configure/controller.coffee',
                    //'routes/login.js': 'routes/login.coffee',
                    //'routes/user.js': 'routes/user.coffee',
                    //'models/user.js': 'models/user.coffee',
                    'APIRoutes/apiRoutes.js': 'APIRoutes/apiRoutes.coffee',
                    'APIControllers/linkController.js': 'APIControllers/linkController.coffee',
                    'APIControllers/linksController.js': 'APIControllers/linksController.coffee',
                    'configure/config.js': 'configure/config.coffee',
                    'models/link.js': 'models/link.coffee'
                    //'lib/config/configureRoutes.js': 'lib/config/configureRoutes.coffee',
                    //'lib/config/configurePassport.js': 'lib/config/configurePassport.coffee',
                    //'controllers/user.js': 'controllers/user.coffee',
                    //'controllers/login.js': 'controllers/login.coffee'
                }
            },
            marionette: {
                files: {
                    //'Marionette/apps/links/module.js': 'Marionette/apps/links/module.coffee'
                }
            }
        },
        coffeelint: {
            options: {
                configFile: 'coffeelint.json'
              },
              app: [
                  '*.coffee',
                  //'routes/*.coffee',
                  //'models/*.coffee',
                  'configure/*.coffee',
                  'APIRoutes/*.coffee',
                  'APIControllers/*.coffee',
                  'Marionette/apps/links/module.coffee'
                  //'controllers/*.coffeeo
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
                    'Marionette/**/*.js'
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
                    //'app.js',
                    //'routes/**/*.js',
                    //'controllers/**/*.js',
                    //'frontEnd.js',
                    //'webAPI.js',
                    'public/qa/**/*.js',
                    'public/js/**/*.js',
                    'qa/**/*.js',
                    'app/**/*.js',
                    'Marionette/**/*.js',
                    '!Marionette/apps/links/module.js'
                ],
                tasks: [
                    'jshint'
                ]
            },
            mocha: {
                files: [
                    'app.js',
                    'controllers/**/*.js',
                    'routes/**/*.js',
                    'configure/*.js'
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
                    'test/*.coffee',
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