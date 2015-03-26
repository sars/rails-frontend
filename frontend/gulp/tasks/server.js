'use strict';

var config  = require('../config');
var express = require('express');
var gulp    = require('gulp');
var morgan  = require('morgan');
var request = require('request');

gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.dist.root));

  server.all('/api/*', function(req, res) {
    var url = 'http://localhost:3000' + req.url.replace(/^\/api/, '');
    req.pipe(request(url, function (err) {
      if (err) {
        console.error('Backend error: ');
        console.error(err);
        res.send(500);
      }
    })).pipe(res);
  });

  // Serve index.html for all routes to leave routing up to Angular
  server.all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver
  server.listen(config.serverport);

});
