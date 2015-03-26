'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var less           = require('gulp-less');
var gulpif         = require('gulp-if');
var handleErrors   = require('../util/handleErrors');
var browserSync    = require('browser-sync');
var minifyCSS      = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var concat         = require('gulp-concat');
var renamePaths     = require('../util/renamePaths');

gulp.task('css', function () {
  return gulp.src(mainBowerFiles({filter: '**/*.css'}).concat(config.styles.src))
    .pipe(gulpif('**/*.less', less()))
    .on('error', handleErrors)
    .pipe(renamePaths())
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.dest))
});

gulp.task('css-dev', function () {
  return gulp.src(mainBowerFiles({filter: '**/*.css'}).concat(config.styles.src), {base: '.'})
    .pipe(gulpif('**/*.less', less()))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })))
});
