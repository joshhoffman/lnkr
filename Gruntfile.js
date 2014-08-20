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

    var vendors = 'jquery backbone backbone.marionette'.split(' ');
    
    var jsFiles = ['app/**/*.js'];
    var qaFiles = ['qa/**/*.js'];
    
    var mariApp = ['app/app/.js'];
    
    var coffeeScriptCompile = {
        'frontEnd.js': 'frontEnd.coffee',
        'webAPI.js': 'webAPI.coffee',
        'configure/controller.js': 'configure/controller.coffee',
        'configure/config.js': 'configure/config.coffee',
        'APIRoutes/apiRoutes.js': 'APIRoutes/apiRoutes.coffee',
        'APIControllers/linkController.js': 'APIControllers/linkController.coffee',
        'APIControllers/linksController.js': 'APIControllers/linksController.coffee',
        'models/link.js': 'models/link.coffee'
    };
    
    var coffeeScriptFiles = [
        '*.coffee',
        'configure/*.coffee',
        'APIRoutes/*.coffee',
        'APIControllers/*.coffee'
    ];

    grunt.initConfig({
        jshint: {
            files: jsFiles,
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
                debug: true,
                extensions: ['.coffee', '.hbs'],
                transform: ['coffeeify', 'hbsfy'],
                shim: {
                    jquery: {
                        path: 'node_modules/jquery/src/jquery.js',
                        exports: '$'
                    }
                }
            },
            dev: {
                src: mariApp,
                dest: 'public/static/bundle.js'
            },
            production: {
                options: {
                    debug: false
                },
                src: mariApp,
                dest: 'public/static/bundleprod.js'
            }
        },
        cafemocha: {
            all: {
                src: qaFiles,
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
              app: coffeeScriptFiles
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
                    'app/**/*.js',
                    'Marionette/**/*.hbs'
                ],
                tasks: [
                    'browserify:dev'
                ]
            },
            jshint: {
                files: [
                    'public/qa/**/*.js',
                    'public/js/**/*.js',
                    'app/**/*.js'
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

    grunt.registerTask('compile', ['coffee', 'browserify:dev', 'handlebars', 'cafemocha'])
    grunt.registerTask('compileProd', ['coffee', 'browserify:prod', 'handlebars', 'cafemocha'])
    grunt.registerTask('lint', ['jshint', 'coffeelint']);
    grunt.registerTask('default', ['lint', 'compile']);
    
    // TODO: add copying required js files to a release directory
    grunt.registerTask('release', ['lint', 'compileProd']);

    grunt.registerTask('runFrontEnd', function() {
        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['frontEnd.js', '4000'],
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
            args: ['webAPI.js', '4001'],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
                grunt.fail.fatal(new Error('nodemon quit'));
            }
        )
    });

    grunt.registerTask('server', ['lint', 'compile', 'runFrontEnd', 'runAPI', 'watch']);
    grunt.registerTask('mariserver', ['compile', 'mari', 'runFrontEnd', 'runAPI', 'watch']);
}