/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const auth = require('./auth.js')();
const users = require('./users.js');
const cfg = require('./config.js');
const app = express();

app.use(bodyParser.json());
app.use(auth.initialize());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  next();
});

app.get('/', function (req, res) {
  res.json({
    status: 'OK!'
  });
});

app.get('/api/user', auth.authenticate(), function (req, res) {
  res.json({
    data: users[req.user.id]
  });
});

app.post('/api/auth/login', function (req, res) {

  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function (u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      var payload = {
        id: user.id,
        email: user.email,
        role: 'user',
      };
      var token = jwt.encode(payload, cfg.jwtSecret);
      return res.json({
        data: {
          message: 'Successfully logged in!',
          token: token
        }
      });
    }
  }
  return res.status(401).json({
    data: {
      error: 'Login/password combination is not correct'
    }
  });
});

app.post('/api/auth/register', function (req, res) {

  if (req.body.email && req.body.password && req.body.password === req.body.confirmPassword) {
    var user = {
      id: 2
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
          token: token
        }
      });
    }
  }
  return res.status(401).json({
    data: {
      error: 'Something went wrong while registering your account. Please check the form and try again.'
    }
  });
});

app.post('/api/auth/request-pass', function (req, res) {
  return res.json({
    data: {
      message: 'Email with instruction has been sent!'
    }
  });
});

app.put('/api/auth/reset-pass', function (req, res) {

  if (req.body.reset_password_token) {
    return res.json({
      data: {
        message: 'Password successfully reset!'
      }
    });
  }
  return res.status(401).json({
    data: {
      error: 'Token is not correct.'
    }
  });
});


app.delete('/api/auth/logout', function (req, res) {
  return res.json({
    data: {
      message: 'Successfully logged out!'
    }
  });
});

app.listen(4400, function () {
  console.log('ngx-admin sample API is running on 4400');
});

module.exports = app;
