'use strict';

var config          = require('../config');
var gulp            = require('gulp');
var jade            = require('gulp-jade');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var mainBowerFiles  = require('main-bower-files');
var streamqueue     = require('streamqueue');

// Views task
gulp.task('pages-dev', function() {
  var cssSources = gulp.src(mainBowerFiles({filter: '**/*.css'}).concat(['build/src/**/*.css'])),
      jsSources = gulp.src(['build/src/**/*.js', 'build/views/**/*.js'])
        .pipe(angularFilesort());

  var sources = streamqueue(
    { objectMode: true },
    gulp.src(mainBowerFiles({filter: '**/*.js'})),
    jsSources,
    cssSources
  );

  // Put our index.html in the dist folder
  gulp.src(config.pages.src)
    .pipe(inject(sources, {ignorePath: '/build'}))
    .pipe(jade({
      compilerOpts: {format: 'html5'}, pretty: true
    }))
    .pipe(gulp.dest(config.pages.dest));
});

// Views task
gulp.task('pages', function() {
  var sources = gulp.src(['build/*.js', 'build/*.css'], {read: false});

  // Put our index.html in the dist folder
  gulp.src(config.pages.src)
    .pipe(inject(sources, {ignorePath: '/build'}))
    .pipe(jade({
      compilerOpts: {format: 'html5'}
    }))
    .pipe(gulp.dest(config.pages.dest));
});
