settings = require('./configure/settings');

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
        'grunt-contrib-handlebars',
        'grunt-contrib-copy',
        'grunt-contrib-clean'
    ].forEach(function(task) {
            grunt.loadNpmTasks(task);
    });

    var vendors = 'jquery backbone backbone.marionette'.split(' ');
    
    var jsFiles = ['app/**/*.js'];
    var qaFiles = ['qa/**/*.js'];
    
    var mariApp = ['app/app.js'];
    
    var coffeeScriptCompile = {
        'frontEnd.js': 'frontEnd.coffee',
        'webAPI.js': 'webAPI.coffee',
        'configure/controller.js': 'configure/controller.coffee',
        'configure/secureController.js': 'configure/secureController.coffee',
        'configure/config.js': 'configure/config.coffee',
        'configure/ensureLogin.js': 'configure/ensureLogin.coffee',
        'configure/configPassport.js': 'configure/configPassport.coffee',
        'configure/utils/utils.js': 'configure/utils/utils.coffee',
        'APIRoutes/apiRoutes.js': 'APIRoutes/apiRoutes.coffee',
        'APIControllers/linkController.js': 'APIControllers/linkController.coffee',
        'APIControllers/linksController.js': 'APIControllers/linksController.coffee',
        'APIControllers/loginController.js': 'APIControllers/loginController.coffee',
        'APIControllers/registerController.js': 'APIControllers/registerController.coffee',
        'APIControllers/logoutController.js': 'APIControllers/logoutController.coffee',
        'models/link.js': 'models/link.coffee',
        'models/user.js': 'models/user.coffee'
    };
    
    var coffeeScriptFiles = [
        '*.coffee',
        'configure/*.coffee',
        'APIRoutes/*.coffee',
        'APIControllers/*.coffee'
    ];

    grunt.initConfig({
        clean: {
            js: [
                'APIControllers/*.js',
                'APIRoutes/*.js',
                'configure/*.js',
                '!configure/settings.js',
                'models/*.js',
                'webAPI.js',
                'frontEnd.js',
                '**/*.map'
            ]
        },
        copy: {
            release: {
                files: [
                    {expand: true, src:[
                        'frontEnd.js',
                        'webAPI.js',
                        'Gruntfile.js',
                        'nodemon.json',
                        'package.json'
                    ], dest: 'deploy/release'},
                    {expand: true, src:['public/**'], dest: 'deploy/release'},
                    {expand: true, src:['APIControllers/*.js'], dest: 'deploy/release'},
                    {expand: true, src:['configure/*.js'], dest: 'deploy/release'},
                    {expand: true, src:['APIRoutes/*.js'], dest: 'deploy/release'},
                    {expand: true, src:['models/*.js'], dest: 'deploy/release'}
                ]
            }
        },
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
            prod: {
                options: {
                    debug: false
                },
                src: mariApp,
                dest: 'public/static/bundle.js'
            }
        },
        cafemocha: {
            all: {
                src: qaFiles,
                options: {ui: 'tdd'}
            }
        },
        coffee: {
            options: {
                sourceMap: false
            },
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
                    'app/**/*.hbs'
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

    grunt.registerTask('compile', ['coffee', 'browserify:dev', 'cafemocha'])
    grunt.registerTask('compileProd', ['coffee', 'browserify:prod', 'cafemocha'])
    grunt.registerTask('lint', ['jshint', 'coffeelint']);
    grunt.registerTask('default', ['lint', 'compile']);
    
    grunt.registerTask('release', ['lint', 'compileProd', 'copy']);

    grunt.registerTask('runFrontEnd', function() {
        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['frontEnd.js', settings.FrontEndPort],
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
            args: ['webAPI.js', settings.APIPort],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
                grunt.fail.fatal(new Error('nodemon quit'));
            }
        )
    });

    grunt.registerTask('server', ['clean', 'lint', 'compile', 'runFrontEnd', 'runAPI', 'watch']);
    grunt.registerTask('mariserver', ['compile', 'mari', 'runFrontEnd', 'runAPI', 'watch']);
}