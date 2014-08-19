var sinon = require('sinon');
var LinksController = require('../../APIControllers/linksController');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

describe("linkController", function() {
    var app = {};

    var Link = {};

    var res = {};

    var lc;

    beforeEach(function () {
        app = {
            post: sinon.spy(),
            get: sinon.spy(),
            put: sinon.spy(),
            delete: sinon.spy()
        };

        Link = {
            findOne: sinon.spy(),
            findOneAndRemove: sinon.spy()
        };

        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };

        lc = new LinksController(app, Link);
    });

    afterEach(function () {
        lc = {};
        Link = {};
        res = {};
        app = {};
    });

    describe("constructor", function () {
        it("should set put", function () {
            //app.get.should.have.been.calledWith("/api/links/:id", lc._get);
            expect(app.put.calledOnce).to.be.true;
        });

        it("should set get", function () {
            //app.get.should.have.been.calledWith("/api/links/:id", lc._get);
            expect(app.get.calledOnce).to.be.true;
        });

        it("should contain api prefix", function () {
            expect(lc._name).to.contain('/api');
        });

        it("should set route to links with id parameter", function () {
            expect(lc._name).to.contain("links");
        });

        it("should set link properly", function () {
            expect(lc.Link).to.equal(Link);
        });
    });
});