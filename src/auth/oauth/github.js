'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');

const authorize = (req, res, next) => {
  console.log('authorizing....');
  const { code } = req.query;
  console.log('code:', code);

  const access_token = `https://github.com/login/oauth/access_token`;
  const options = {
    client_id: 'bf82d3a97e326e326c91',
    client_secret: 'a5d75ca7327084ef0f2be14d0f4c657bc7589f0d',
    code,
  };

  return superagent
    .post(access_token)
    .send(options)
    .then(result => {
      const { access_token } = result.body;
      return access_token;
    })
    .then(access_token => {
      console.log('access_token:', access_token);
      const link = `https://api.github.com/user?access_token=${access_token}`;
      return superagent
        .get(link)
        .set('Authorization', `Bearer ${access_token}`)
        .then(result => {
          console.log('result.body:', result.body);
          return result.body;
        });
    })
    .then(user => Users.createFromOauth(user.email))
    .then(actualUser => actualUser.generateToken())
    .catch(error => error);
};

module.exports = authorize;
