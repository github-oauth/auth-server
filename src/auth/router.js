'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/github.js');

authRouter.get('/', (req, res, next) => {
  res.send('Up and running...');
});

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req, res, next) => {
  console.log('Received a request at `/oauth`');
  oauth(req)
    .then(token => {
      console.log('Token passed to routes:', token);
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;
