const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config()
const rp = require('request-promise');

router.get('/narrative/:selection', function(req, res, next) {
  var options = {
    method: 'POST',
    uri: `https://api.automatedinsights.com/v1.5/projects/project/templates/template/outputs`,
    body: { 'data': {'team': req.params.selection } },
    json: true,
    headers: {
      Authorization: 'Bearer ' + process.env.WORDSMITH_API,
      'User-Agent': 'Internal Demo'
    }
  };

  // Hit API using request-promise library
  rp(options)
    .then(function(resp) {
      res.send({
        resp: resp.data.content
      });
    })
    .catch(function(err) {
      // console.error(err);
      res.send({
        resp: err
      });
    });
});

module.exports = router;
