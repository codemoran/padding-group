/* eslint func-names:0, max-len: 0, no-undef:0, no-underscore-dangle: 0 */

var assert = require('chai').assert;
var errors = require('restify-errors');
var leftPad = require('../lib/leftpad');
var rightPad = require('../lib/rightpad');
var validateOptions = require('../lib/validate');

function options(string, length, paddingChar) {
  return {
    stringToPad: string,
    lengthToPad: length,
    characterToPadWith: paddingChar
  };
}

function createRequest(string, length, paddingChar) {
  var _headers = {
    'X-STR': string,
    'X-LEN': length,
    'X-CH': paddingChar
  };
  return {
    header: function (key) {
      return _headers[key];
    }
  };
}

describe('leftpad', function () {
  it('should leftpad with a space if a character was not passed in', function () {
    assert.strictEqual(leftPad(options('foo', 5)), '  foo');
  });
  it('should leftpad with spaces', function () {
    assert.strictEqual(leftPad(options('foo', 5)), '  foo');
  });
  it('should leftpad with non-space characters', function () {
    assert.strictEqual(leftPad(options(1, 2, 0)), '01');
    assert.strictEqual(leftPad(options(1, 2, '-')), '-1');
    assert.strictEqual(leftPad(options('foo', 7, 1)), '1111foo');
  });
  it('should not add any characters if it is string is greater than the length', function () {
    assert.strictEqual(leftPad(options('foobar', 6)), 'foobar');
    assert.strictEqual(leftPad(options('foo', 2, ' ')), 'foo');
    assert.strictEqual(leftPad(options('foo', -1, ' ')), 'foo');
  });
});

describe('rightpad', function () {
  it('should rightpad with a space if a character was not passed in', function () {
    assert.strictEqual(rightPad(options('foo', 5)), 'foo  ');
  });
  it('should rightpad with spaces', function () {
    assert.strictEqual(rightPad(options('foo', 5, ' ')), 'foo  ');
  });
  it('should rightpad with non-space characters', function () {
    assert.strictEqual(rightPad(options(1, 2, 0)), '10');
    assert.strictEqual(rightPad(options(1, 2, '-')), '1-');
    assert.strictEqual(rightPad(options('foo', 7, 1)), 'foo1111');
  });
  it('should not add any characters if it is string is greater or equal to the length', function () {
    assert.strictEqual(rightPad(options('foobar', 6, ' ')), 'foobar');
    assert.strictEqual(rightPad(options('foo', 2, ' ')), 'foo');
    assert.strictEqual(rightPad(options('foo', -1, ' ')), 'foo');
  });
});

describe('validate', function () {
  describe('#options', function () {
    it('should create the correct options if a padding character was not passed in', function () {
      var request = createRequest('foo', 5);
      var requestOptions = validateOptions(request);
      var expectedOptions = options('foo', 5);
      assert.deepEqual(requestOptions, expectedOptions);
    });

    it('should create the correct options if a padding character was passed in', function () {
      var request = createRequest('foo', 5, ' ');
      var requestOptions = validateOptions(request);
      var expectedOptions = options('foo', 5, ' ');
      assert.deepEqual(requestOptions, expectedOptions);
    });

    it('should return an error if there was no string passed in', function () {
      var request = createRequest(undefined, 5, ' ');
      var requestOptions = validateOptions(request);
      assert.instanceOf(requestOptions, errors.BadRequestError);
      assert.equal(requestOptions.message, 'There was no string to pad, you need to set the X-STR header');
    });

    it('should return an error if the string was too long', function () {
      var string = rightPad(options('foobar', 2049, 'f'));
      var request = createRequest(string, 2050, ' ');
      var requestOptions = validateOptions(request);
      assert.instanceOf(requestOptions, errors.BadRequestError);
      assert.equal(requestOptions.message, 'There are no strings in existance that are more than 2048 characters, you must be doing something wrong');
    });

    it('should return an error if the combined length is too long', function () {
      var request = createRequest('foobar', 2050, ' ');
      var requestOptions = validateOptions(request);
      assert.instanceOf(requestOptions, errors.BadRequestError);
      assert.equal(requestOptions.message, 'There are no strings in existance that are more than 2048 characters, you must be doing something wrong');
    });

    it('should return an error the length property was not given', function () {
      var request = createRequest('foobar', null, ' ');
      var requestOptions = validateOptions(request);
      assert.instanceOf(requestOptions, errors.BadRequestError);
      assert.equal(requestOptions.message, 'There was no string length set, you need to set the X-LEN header');
    });
  });
});
