'use strict';

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const path = require('path');

const utils = require('../app/utils.js');

describe("Utils file tests", function () {

    describe("isValidJsonString part", function () {

        it("it will return true on valid json", function () {
            // given
            const json = '["test","valid","json"]';

            // when
            const testJsonResult = utils.isValidJsonString(json)

            // then
            expect(testJsonResult).to.be.true;
        });

        it("it will return false on no valid json", function () {
            // given
            const json = "['test','valid','json']";

            // when
            const testJsonResult = utils.isValidJsonString(json)

            // then
            expect(testJsonResult).to.be.false;
        });

        it("it will return false on no valid json", function () {
            // given
            const json = '{"test"?"notvalid"] test';

            // when
            const testJsonResult = utils.isValidJsonString(json)

            // then
            expect(testJsonResult).to.be.false;
        });

    });

    describe("openDirectory part", function () 
    {

        const sandbox = sinon.sandbox.create();
        afterEach(() => sandbox.restore());

        it("it will call open directory on mac", function (done) {
            
            // given
            const directory = 'files';
            sandbox.stub(process, 'platform').value('darwin');

            // when
            utils.openDirectory(directory,(command) => {

                // then
                expect(command).to.be.equal(`open ${directory}`);
                done();
            })

        });
        
        it("it will call nautilus directory on linux", function (done) {
            
            // given
            const directory = 'files';
            sandbox.stub(process, 'platform').value('linux');

            // when
            utils.openDirectory(directory,(command) => {

                // then
                expect(command).to.be.equal(`nautilus ${directory}`);
                done();
            })

        });

        it("it will send error on wrong directory", function (done) {
            
            // given
            const directory = 'lololo';
            sandbox.stub(process, 'platform').value('darwin');

            // when
            utils.openDirectory(directory,(command, error) => {
            
                // then
                expect(command).to.be.equal(`open ${directory}`);
                expect(error.message).to.be.equal(`Command failed: open ${directory}\nThe file ${path.join(__dirname, '/../')}${directory} does not exist.\n`);
                done();
            })

        });

        it("it will send error on unknow plateform", function (done) {
            
            // given
            const directory = 'files';
            const platform = 'mars';
            sandbox.stub(process, 'platform').value(platform);

            // when
            utils.openDirectory(directory,(command, error) => {

                // then
                expect(command).to.be.equal('');
                expect(error.message).to.be.equal(`Platform ${platform} not support for the moment`);
                done();
            })

        });

    });


    describe("getAnswers part", function () {

    });

});