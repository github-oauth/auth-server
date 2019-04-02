'use strict';
const superagent = require('superagent');

const authorize = (req, res, next) => {
  const { code } = req.query;

  const access_token = `https://github.com/login/oauth/access_token`;

  return superagent
    .post(access_token)
    .send({
      client_id: '',
      client_secret: '',
      code: '',
      redirect_url: '',
      state: '',
    })
    .then(response => console.log('response:', response));
};

module.exports = authorize;
