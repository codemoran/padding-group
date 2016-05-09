/* eslint no-console:0 */

// When a client request is sent for a URL that does exist,
function onMethodNotAllowed(request, response) {
  response.send(405, { 'question-framed-incorrectly': true });
}

// When a client request is sent for a URL that does not exist
function onNotFound(request, response) {
  response.send(404, { 'string-you-are-looking-for': false });
}

// When a client request is sent for a route that exist, but has a content-type mismatch
function onUnsupportedMediaType(request, response) {
  response.send(415, { 'knows-what-they-are-looking-for': false });
}

// Emitted when some handler throws an uncaughtException somewhere in the chain.
// The default behavior is to just call res.send(error), and let the built-ins
// in restify handle transforming, but you can override to whatever you want here.
function onUncaughtException(request, response, route, error) {
  console.error('Error!');
  console.error(route);
  console.error(error);
  response.send(500, { 'uh-oh-string-destroyed-like-the-deathstar': true });
}

module.exports = {
  onMethodNotAllowed: onMethodNotAllowed,
  onNotFound: onNotFound,
  onUncaughtException: onUncaughtException,
  onUnsupportedMediaType: onUnsupportedMediaType
};
