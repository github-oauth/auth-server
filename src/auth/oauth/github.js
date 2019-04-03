'use strict';
const superagent = require('superagent');

const authorize = (req, res, next) => {
  const { code } = req.query;

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
      const link = `https://api.github.com/user?access_token=${access_token}`;
      console.log('link:', link);
      return superagent
        .get(link)
        .set('Authorization', `Bearer ${access_token}`)
        .then(result => console.log('body:', result.body));
    })

    .catch(console.error);
};

module.exports = authorize;
