/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

var passport = require('passport');
var passportJWT = require('passport-jwt');
var users = require('./users.js');
var cfg = require('./config.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
  var strategy = new Strategy(params, function (payload, done) {
    var user = users[payload.sub -1 ] || null;
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error('User not found'), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};
