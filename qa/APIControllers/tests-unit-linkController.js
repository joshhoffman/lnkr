var sinon = require('sinon');
var LinkController = require('../../APIControllers/linkController');
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

    beforeEach(function() {
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

        config = {
            Link: Link
        };

        lc = new LinkController(app, config);
    });

    afterEach(function() {
        lc = {};
        Link = {};
        res = {};
        app = {};
    });

    describe("constructor", function() {
        it("should set put", function() {
            //app.get.should.have.been.calledWith("/api/links/:id", lc._get);
            expect(app.put.calledOnce).to.be.true;
        });

        it("should set get", function() {
            //app.get.should.have.been.calledWith("/api/links/:id", lc._get);
            expect(app.get.calledOnce).to.be.true;
        });

        it("should contain api prefix", function() {
            expect(lc._name).to.contain('/api');
        });

        it("should set route to links with id parameter", function() {
            expect(lc._name).to.contain("links/:id");
        });

        it("should set link properly", function() {
            expect(lc.Link).to.equal(Link);
        });
    });

    describe("_get", function() {

        var expectedSuccess = { data: true };
        var expectedFail = { data: false };

        var req = {
            params: {
                id: "test"
            }
        };

        it("should call findOne", function() {
            lc._get(req, res, {});

            expect(Link.findOne.calledOnce).to.be.true;
        });

        it("should use id parameter", function() {
            lc._get(req, res, {});

            expect(Link.findOne.args[0]).to.contain({ name: req.params.id} );
        });

        it("should pass in a function", function() {
            lc._get(req, res, {});

            expect(Link.findOne.args[0][1]).to.be.a('function');
        });

        it("should send res.json the returned model", function() {
            lc._get(req, res, {});

            var retFunc = Link.findOne.args[0][1];

            retFunc(null, expectedSuccess);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json).to.be.calledWith(expectedSuccess);
        });

        it("should set status to fail on failure", function() {
            lc._get(req, res, {});

            var retFunc = Link.findOne.args[0][1];

            retFunc({fail: "failure"}, expectedFail);

            expect(res.status.calledOnce).to.be.true;
            expect(res.status).to.be.calledWith(404);
        });

        it("should respond with status false", function() {
            lc._get(req, res, {});

            var retFunc = Link.findOne.args[0][1];

            retFunc({fail: "failure"}, expectedFail);

            expect(res.json).to.be.calledWith({ "status": false});
        });
    });

    describe("put", function() {

        var expectedSuccess = { data: true };
        var expectedFail = { data: false };

        var retFunc;

        var req = {
            body: {
                name: "name",
                link: "link",
                description: "desc"
            }
        };

        var linkModel = {};

        beforeEach(function() {
            linkModel = {
                save: sinon.spy()
            };

            lc._put(req, res, {});

            retFunc = Link.findOne.args[0][1];
        });

        it("should find the item", function() {
            expect(Link.findOne.calledOnce).to.be.true;
        });

        it("should set status to fail on find failure", function() {
            retFunc({fail: "failure"}, linkModel);

            expect(res.status.calledOnce).to.equal(true);
            expect(res.status).to.be.calledWith(404);

            expect(linkModel.save.called).to.not.be.true;
        });

        it("should respond with status false if find fails", function() {
            retFunc({fail: "failure"}, expectedFail);

            expect(res.json).to.be.calledWith({ "status": false});
        });

        it("should set the returned model values correctly", function() {
            retFunc(null, linkModel);

            expect(linkModel.name).to.equal(req.body.name);
            expect(linkModel.link).to.equal(req.body.link);
            expect(linkModel.description).to.equal(req.body.description);
        });

        it("should call the model's save method", function() {
            retFunc(null, linkModel);

            expect(linkModel.save.calledOnce).to.be.true;
        });

        it("should set an error if save fails", function() {
            retFunc(null, linkModel);

            var saveRetFunc = linkModel.save.args[0][0];

            saveRetFunc({fail: "failure"}, null);

            expect(res.status.calledOnce).to.be.true;
            expect(res.status).to.be.calledWith(404);
        });

        it("should respond with error on save failure", function() {
            retFunc(null, linkModel);

            var saveRetFunc = linkModel.save.args[0][0];

            saveRetFunc({fail: "failure"}, null);

            expect(res.json).to.be.calledWith({"status": false});
        });

        it("should respond with the model on save success", function() {
            retFunc(null, linkModel);

            var saveRetFunc = linkModel.save.args[0][0];

            saveRetFunc(null, expectedSuccess);

            expect(res.json).to.be.calledWith(expectedSuccess);
        });
    });

    describe("delete", function() {
        var req = {
            params: {
                id: "name",
                name: "name",
                link: "link",
                description: "desc"
            }
        };

        var expectedSuccess = { "status": true };

        var retFunc;

        beforeEach(function() {
            lc._delete(req, res, {});

            retFunc = Link.findOneAndRemove.args[0][1];
        });

        it("should call findOneAndRemove", function() {
            expect(Link.findOneAndRemove.calledOnce).to.be.true;
        });

        it("should use the correct parameter", function() {
            expect(Link.findOneAndRemove.args[0][0]).to.contain({name: req.params.id});
        });

        it("should set an error if delete fails", function() {
            retFunc({status: "false"}, null);

            expect(res.status.calledOnce).to.be.true;
            expect(res.status).to.be.calledWith(400);
        });

        it("should respond with error on delete failure", function() {
            retFunc({fail: "failure"}, null);

            expect(res.json).to.be.calledWith({"status": false});
        });

        it("should respond with status on delete success", function() {
            retFunc(null, {});

            expect(res.json).to.be.calledWith(expectedSuccess);
        });
    });
});