lnkr
=============
> This project is my sandbox for learning [Backbone](http://backbonejs.org/) / [Marionette](http://marionettejs.com/)

## Why?
Because I'd like to learn Marionette while making a small app that I see myself using.

Lnkr aims to be a central store for links that I find interesting and would like to read later.

### Tools
[Backbone](http://backbonejs.org/)

[Marionette](http://marionettejs.com/)

[Grunt](http://gruntjs.com/)

[Browserify](http://browserify.org/)

[JSHint](http://www.jshint.com/)

[CoffeeScript](http://coffeescript.org/)

[CoffeeLint](http://www.coffeelint.org/)

###Layout
The repository contains app files for a UI in both pure Backbone, as well as one written with the Marionette framework. The server is front-end agnostic, and each one can be built and deployed using different Grunt commands.

####Usage
`grunt bbserver`
Compiles the Backbone front end code and starts the front end/back end servers. The front end and back end servers will start on ports 5000 and 5001 respectively by default.

`grunt mariserver`
Compiles the Marionette front end code and starts the servers like above

## Future work
After I get the Marionette front end working, the next step is to add authentication as well as adding tags for each link to allow for quick sorting the list
