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

    grunt.initConfig({
        jshint: {
            options: {
                multistr: true
            },
            all: ['app/**/*.js']
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
                    //'routes/login.js': 'routes/login.coffee',
                    //'routes/user.js': 'routes/user.coffee',
                    //'models/user.js': 'models/user.coffee',
                    'configure/config.js': 'configure/config.coffee',
                    //'lib/config/configureRoutes.js': 'lib/config/configureRoutes.coffee',
                    //'lib/config/configurePassport.js': 'lib/config/configurePassport.coffee',
                    //'controllers/user.js': 'controllers/user.coffee',
                    //'controllers/login.js': 'controllers/login.coffee'
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
                  //'controllers/*.coffee'
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
            jshint: {
                files: [
                    //'app.js',
                    //'routes/**/*.js',
                    //'controllers/**/*.js',
                    'frontEnd.js',
                    'webAPI.js',
                    'public/qa/**/*.js',
                    'public/js/**/*.js',
                    'qa/**/*.js',
                    'app/**/*.js'
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
                    'lib/**/*.js'
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
                    'routes/*.coffee',
                    'models/*.coffee',
                    'socket/*.coffee',
                    'lib/**/*.coffee',
                    'controllers/*.coffee'
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
    grunt.registerTask('compile', ['coffee', 'browserify', 'handlebars', 'cafemocha'])
    grunt.registerTask('lint', ['jshint', 'coffeelint']);
    grunt.registerTask('default', ['lint', 'compile']);
    grunt.registerTask('runFrontEnd', function() {
        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['frontEnd.js', '5000'],
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

    grunt.registerTask('server', ['lint', 'compile', 'runFrontEnd', 'runAPI', 'watch']);
}