function UnauthorizedException(msg) {
  this.message = msg || 'You do not have permission to do that operation';
}

function EntityDoesNotExists(msg) {
  this.message = msg;
}

module.exports = {
  UnauthorizedException,
  EntityDoesNotExists,
};
