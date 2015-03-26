'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['css-dev', 'images', 'fonts', 'locales', 'views', 'js-dev'], 'pages-dev', 'watch', cb);

});
