var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var router = require('../../APIRoutes/apiRoutes').routes;

var LinkController = require('../../APIControllers/linkController');

describe("apiRoutes", function() {
    var linkController;
    var linksController;
    var app = {};
    var Link = {};

    beforeEach(function() {
        linkController = sinon.spy();
        linksController = sinon.spy();
    });

    describe("route setup", function() {
        it("should set up LinkController", function() {
        });
    });
});