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
The repository contains app files for a UI in both pure Backbone, as well as one written with the Marionette framework. The server is front-end agnostic, and each one can be built and deployed using different Grunt commands. However, I realized the benefits of Marionette and the pure Backbone implementation support has been dropped.

####Usage
`grunt server`
Compiles the Marionette front end code and starts the front end/back end servers. The front end and back end servers will start on ports 4000 and 4001 respectively by default.

## Future work
After I get the Marionette front end working, the next step is to add authentication as well as adding tags for each link to allow for quick sorting the list. Also, I would like to allow clicking a saved link to display that link's content in a sub view of the page.
