/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const auth = require('./auth.js')();
const auth_helpers = require('./auth_helpers.js');
const users = require('./users.js');
const tokens = require('./token_helpers.js');
const wines = require('./wines.js');
const cfg = require('./config.js');
const app = express();
const moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(auth.initialize());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  next();
});

app.get('/', function (req, res) {
  res.json({
    status: 'OK!',
  });
});

app.get('/api/user', auth.authenticate(), function (req, res) {
  res.json({
    data: users[req.user.id],
  });
});

app.get('/api/wines', auth.authenticate(), function (req, res) {
  res.json(wines);
});

app.post('/api/auth/login', function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function (u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      return res.json({
        data: {
          message: 'Successfully logged in!',
          token: tokens.createAccessToken(user),
        },
      });
    }
  }
  return res.status(401).json({
    data: {
      error: 'Login/password combination is not correct',
    },
  });
});

app.post('/api/auth/token', function (req, res) {
  if (req.body.username && req.body.password) {
    var email = decodeURIComponent(req.body.username);
    var password = req.body.password;
    var user = users.find(function (u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      return res.json({
        token_type: 'Bearer',
        access_token: tokens.createAccessToken(user),
        expires_in: cfg.accessTokenExpiresIn,
        refresh_token: tokens.createRefreshToken(user),
      });
    }
  }
  return res.status(401).json({
    error: 'invalid_client',
    error_description: 'Invalid Login/Password combination.',
  });
});

app.post('/api/auth/register', function (req, res) {
  if (req.body.email && req.body.password && req.body.password === req.body.confirmPassword) {
    var user = {
      id: 2,
    };
    if (user) {
      var payload = {
        id: user.id,
        email: user.email,
        role: 'user',
      };
      var token = jwt.encode(payload, cfg.jwtSecret);
      return res.json({
        data: {
          message: 'Successfully registered!',
          token: token,
        },
      });
    }
  }
  return res.status(401).json({
    data: {
      error: 'Something went wrong while registering your account. Please check the form and try again.',
    },
  });
});

app.post('/api/auth/request-pass', function (req, res) {
  return res.json({
    data: {
      message: 'Email with instruction has been sent!',
    },
  });
});

app.put('/api/auth/reset-pass', function (req, res) {
  if (req.body.reset_password_token) {
    return res.json({
      data: {
        message: 'Password successfully reset!',
      },
    });
  }
  return res.status(401).json({
    data: {
      error: 'Token is not correct.',
    },
  });
});

app.delete('/api/auth/logout', function (req, res) {
  return res.json({
    data: {
      message: 'Successfully logged out!',
    },
  });
});

app.post('/api/auth/refresh-token', function (req, res) {
  // token issued by oauth2 strategy
  if (req.body.refresh_token) {
    var token = req.body.refresh_token;
    var parts = token.split('.');
    if (parts.length !== 3) {
      return res.status(401).json({
        error: 'invalid_token',
        error_description: 'Invalid refresh token',
      });
    }
    var payload = JSON.parse(auth_helpers.urlBase64Decode(parts[1]));
    var exp = payload.exp;
    var userId = payload.sub;
    var now = moment().unix();
    if (now > exp) {
      return res.status(401).json({
        error: 'unauthorized',
        error_description: 'Refresh Token expired.',
      });
    } else {
      return res.json({
        token_type: 'Bearer',
        access_token: tokens.createAccessToken(users[userId - 1]),
        expires_in: cfg.accessTokenExpiresIn,
      });
    }
  }

  // token issued via email strategy
  if (req.body.token) {
    return res.json({
      data: {
        message: 'Successfully refreshed token!',
        token: tokens.createAccessToken(users[0]),
      },
    });
  }
});

app.listen(4400, function () {
  console.log('ngx-admin sample API is running on 4400');
});

module.exports = app;
