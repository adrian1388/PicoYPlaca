var assert = require('assert');
var chaiAssert = require("chai").assert;
var main = require('../main');

/**
 * To run tests please run "mocha test.js" on root of project
 */
describe("Pico Y Placa tests using ASSERT interface from MOCHA: ", function() {
	describe("Check picoYPlaca Function: ", function() {

		it("picoYPlaca(): Invalid Plate", function() {
			result = main.picoYPlaca();
			assert.equal(result, "Invalid Plate");
		});

		it("picoYPlaca('', '', ''): Invalid Plate", function() {
			result = main.picoYPlaca("", "", "");
			chaiAssert.equal(result, "Invalid Plate");
		});

		it("picoYPlaca('1234', '', ''): Invalid Date", function() {
			result = main.picoYPlaca("1234", "", "");
			chaiAssert.equal(result, "Invalid Date");
		});

		it("picoYPlaca('1234', '123456', ''): Invalid Date", function() {
			result = main.picoYPlaca("1234", "", "");
			chaiAssert.equal(result, "Invalid Date");
		});

		it("picoYPlaca('1234', '12 dic 2014', ''): Invalid Date", function() {
			result = main.picoYPlaca("1234", "12 dic 2014", "");
			chaiAssert.equal(result, "Invalid Date");
		});

		it("picoYPlaca('ABC', '11-27-2018', '7:30'): No restriction", function() {
			result = main.picoYPlaca("ABC", "11-27-2018", "7:30");
			chaiAssert.equal(result, "No restriction");
		});

		it("picoYPlaca('1234', '12-12-2014', ''): No restriction", function() {
			result = main.picoYPlaca("1234", "12-12-2014", "");
			chaiAssert.equal(result, "No restriction");
		});

		it("picoYPlaca('1234', '11-27-2018', '7:30'): Restriction", function() {
			result = main.picoYPlaca("1234", "11-27-2018", "7:30");
			chaiAssert.equal(result, "Restriction");
		});

		it("picoYPlaca('1234', '11-27-2018', '16:30'): Restriction", function() {
			result = main.picoYPlaca("1234", "11-27-2018", "16:30");
			chaiAssert.equal(result, "Restriction");
		});

		it("picoYPlaca('1234', '11-27-2018', '5:30'): No restriction", function() {
			result = main.picoYPlaca("1234", "11-27-2018", "5:30");
			chaiAssert.equal(result, "No restriction");
		});

		it("picoYPlaca('1234', '11-27-2018', '20:30'): No restriction", function() {
			result = main.picoYPlaca("1234", "11-27-2018", "20:30");
			chaiAssert.equal(result, "No restriction");
		});

		it("Check the Type returned value: String", function() {
			result = main.picoYPlaca();
			chaiAssert.typeOf(result, "string");
		});
	});
});