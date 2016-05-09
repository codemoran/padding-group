/* eslint max-len:0 */

var errors = require('restify-errors');
var format = require('util').format;

var MAX_LENGTH = 2048;

function getHeaders(request) {
  return {
    stringToPad: request.header('X-STR'),
    lengthToPad: parseInt(request.header('X-LEN'), 10),
    characterToPadWith: request.header('X-CH')
  };
}

function validateOptions(request) {
  var options = getHeaders(request);

  if (!options.stringToPad) {
    return new errors.BadRequestError(
      'There was no string to pad, you need to set the X-STR header');
  }

  if (options.stringToPad.length > MAX_LENGTH) {
    return new errors.BadRequestError(
      format('There are no strings in existance that are more than %s characters, you must be doing something wrong', MAX_LENGTH)
    );
  }

  if (options.lengthToPad === null || options.lengthToPad === undefined || isNaN(options.lengthToPad)) {
    return new errors.BadRequestError(
      'There was no string length set, you need to set the X-LEN header'
    );
  }

  if (options.lengthToPad > MAX_LENGTH) {
    return new errors.BadRequestError(
        format('There are no strings in existance that are more than %s characters, you must be doing something wrong', MAX_LENGTH)
    );
  }

  return options;
}

module.exports = validateOptions;
