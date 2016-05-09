'use strict';

var bunyan = require('bunyan');
var errors = require('restify-errors');
var restify = require('restify');

var errorHandlers = require('./lib/errorHandlers');
var leftpad = require('./lib/leftpad');
var rightpad = require('./lib/rightpad');
var validate = require('./lib/validate');

var log;
var server;

// add leet headers to let the world know we mean business
restify.defaultResponseHeaders = function defaultResponseHeaders() {
  this.header('Agile', 'activated');
  this.header('Lean', 'activated');
  this.header('Server', 'NewHipsterTech');
  this.header('WebScale', 'activated');
};

// log with bunyan because the reign of plain text is over (until its not)
log = bunyan.createLogger({
  name: 'api',
  level: process.env.LOG_LEVEL || 'info',
  stream: process.stdout,
  serializers: {
    err: errors.bunyanSerializer,
    req: bunyan.stdSerializers.req
  }
});

server = restify.createServer({
  name: 'api',
  version: '1.0.0',
  log: log
});

server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());

server.on('after', restify.auditLogger({ log: log }));
server.on('MethodNotAllowed', errorHandlers.onMethodNotAllowed);
server.on('NotFound', errorHandlers.onNotFound);
server.on('uncaughtException', errorHandlers.onUncaughtException);
server.on('UnsupportedMediaType', errorHandlers.onUnsupportedMediaType);

server.get('/leftpad', function onGet(request, response, next) {
  var options = validate(request);
  if (options instanceof Error) return next(options);

  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  return response.send(200, { str: leftpad(options) });
});

server.get('/rightpad', function onGet(request, response, next) {
  var options = validate(request);
  if (options instanceof Error) {
    return next(options);
  }
  return response.send(200, { str: rightpad(options) });
});

console.log('Server started.'); // eslint-disable-line no-console
server.listen(8888, function listen() {
  log.info('%s listening at %s', server.name, server.url);
});
