module.exports = function(grunt) {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-less',
        'grunt-contrib-watch',
        'grunt-contrib-coffee',
        'grunt-coffeelint'
    ].forEach(function(task) {
            grunt.loadNpmTasks(task);
        });

    grunt.initConfig({
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
        watch: {
            jshint: {
                files: [
                    //'app.js',
                    //'routes/**/*.js',
                    //'controllers/**/*.js',
                    'frontEnd.js',
                    'webAPI.js',
                    'public/qa/**/*.js',
                    'public/js/**/*.js',
                    'qa/**/*.js'
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
            }
        },
        notify: {
            cafemocha: {
                message: 'Mocha done!'
            }
        }
    });

    //grunt.registerTask('default', ['cafemocha', 'jshint', 'less', 'notify:cafemocha'])
    grunt.registerTask('default', ['cafemocha', 'coffee', 'coffeelint'])
    grunt.registerTask('runFrontEnd', function() {
        grunt.util.spawn({
            cmd: 'node',
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
            cmd: 'node',
            args: ['webAPI.js', '5001'],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
                grunt.fail.fatal(new Error('nodemon quit'));
            }
        )
    });

    grunt.registerTask('server', ['coffee', 'runFrontEnd', 'runAPI', 'watch']);
}