const moment = require('moment');
const jwt = require('jwt-simple');
const cfg = require('./config.js');

module.exports.permanentRefreshToken = 'eb4e15840117437cbfd7343f257c4aae';

module.exports.createAccessToken = function (user) {
  var payload = {
    sub: user.id,
    exp: moment().add(cfg.accessTokenExpiresIn, 'seconds').unix(),
    iat: moment().unix(),
    id: user.id,
    email: user.email,
    role: 'user',
  };
  var token = jwt.encode(payload, cfg.jwtSecret);
  return token;
};

module.exports.createRefreshToken = function (user) {
  var refreshPayload = {
    sub: user.id,
    exp: moment().add(cfg.refreshTokenExpiresIn, 'seconds').unix(),
    iat: moment().unix(),
    id: user.id,
    email: user.email,
    role: 'REFRESH_TOKEN',
  };
  var refreshToken = jwt.encode(refreshPayload, cfg.jwtSecret);
  return refreshToken;
};

module.exports;
