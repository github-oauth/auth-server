'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');

const authorize = (req, res, next) => {
  console.log('Authorization initiated.');
  const { code } = req.query;
  console.log('Code received:', code);

  const access_token = `https://github.com/login/oauth/access_token`;
  const options = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  return superagent
    .post(access_token)
    .send(options)
    .then(result => {
      const { access_token } = result.body;
      console.log('Received access_token:', access_token);
      return access_token;
    })
    .then(access_token => {
      const link = `https://api.github.com/user?access_token=${access_token}`;
      return superagent
        .get(link)
        .set('Authorization', `Bearer ${access_token}`)
        .then(result => {
          console.log('User result from GitHub:', result.body);
          return result.body;
        });
    })
    .then(user => Users.createFromOauth(user.email))
    .then(actualUser => actualUser.generateToken())
    .catch(error => error);
};

module.exports = authorize;
