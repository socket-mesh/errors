
function AuthTokenExpiredError(message, expiry) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthTokenExpiredError';
  this.message = message;
  this.expiry = expiry;
};
AuthTokenExpiredError.prototype = Object.create(Error.prototype);


function AuthTokenInvalidError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthTokenInvalidError';
  this.message = message;
};
AuthTokenInvalidError.prototype = Object.create(Error.prototype);


function SilentMiddlewareBlockedError(message, type) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'SilentMiddlewareBlockedError';
  this.message = message;
  this.type = type;
};
SilentMiddlewareBlockedError.prototype = Object.create(Error.prototype);


function InvalidActionError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'InvalidActionError';
  this.message = message;
};
InvalidActionError.prototype = Object.create(Error.prototype);


function InvalidArgumentsError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'InvalidArgumentsError';
  this.message = message;
};
InvalidArgumentsError.prototype = Object.create(Error.prototype);

function InvalidOptionsError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'InvalidOptionsError';
  this.message = message;
};
InvalidOptionsError.prototype = Object.create(Error.prototype);


function InvalidMessageError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'InvalidMessageError';
  this.message = message;
};
InvalidMessageError.prototype = Object.create(Error.prototype);


function SocketProtocolError(message, code) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'SocketProtocolError';
  this.message = message;
  this.code = code;
};
SocketProtocolError.prototype = Object.create(Error.prototype);


function ServerProtocolError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'ServerProtocolError';
  this.message = message;
};
ServerProtocolError.prototype = Object.create(Error.prototype);


function TimeoutError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'TimeoutError';
  this.message = message;
};
TimeoutError.prototype = Object.create(Error.prototype);


function BrokerError(message) {
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'BrokerError';
  this.message = message;
};
BrokerError.prototype = Object.create(Error.prototype);


// Expose all error types

module.exports = {
  AuthTokenExpiredError: AuthTokenExpiredError,
  AuthTokenInvalidError: AuthTokenInvalidError,
  SilentMiddlewareBlockedError: SilentMiddlewareBlockedError,
  InvalidActionError: InvalidActionError,
  InvalidArgumentsError: InvalidArgumentsError,
  InvalidOptionsError: InvalidOptionsError,
  InvalidMessageError: InvalidMessageError,
  SocketProtocolError: SocketProtocolError,
  ServerProtocolError: ServerProtocolError,
  TimeoutError: TimeoutError,
  BrokerError: BrokerError
};

module.exports.socketProtocolErrorStatuses = {
  1001: 'Socket was disconnected',
  1002: 'A WebSocket protocol error was encountered',
  1003: 'Server terminated socket because it received invalid data',
  1005: 'Socket closed without status code',
  1006: 'Socket hung up',
  1007: 'Message format was incorrect',
  1008: 'Encountered a policy violation',
  1009: 'Message was too big to process',
  1010: 'Client ended the connection because the server did not comply with extension requirements',
  1011: 'Server encountered an unexpected fatal condition',
  4000: 'Server ping timed out',
  4001: 'Client pong timed out',
  4002: 'Server failed to sign auth token',
  4003: 'Failed to complete handshake',
  4004: 'Client failed to save auth token',
  4005: 'Did not receive #handshake from client before timeout',
  4006: 'Failed to bind socket to message broker'
};

module.exports.socketProtocolIgnoreStatuses = {
  1000: 'Socket closed normally',
  1001: 'Socket hung up'
};

module.exports.hydrateError = function (error) {
  var hydratedError = null;

  if (error != null) {
    if (typeof error == 'string') {
      hydratedError = error;
    } else {
      hydratedError = new Error(error.message);
      for (var i in error) {
        if (error.hasOwnProperty(i)) {
          hydratedError[i] = error[i];
        }
      }
    }
  }
  return hydratedError;
};
