'use strict';

var config          = require('../config');
var gulp            = require('gulp');
var concat          = require('gulp-concat');
var ngAnnotate      = require('gulp-ng-annotate');
var gulpif          = require('gulp-if');
var uglify          = require('gulp-uglify');
var mainBowerFiles  = require('main-bower-files');
var path            = require('path');
var browserSync     = require('browser-sync');
var streamqueue     = require('streamqueue');
var angularFilesort = require('gulp-angular-filesort');

var templateCache  = require('gulp-angular-templatecache');
var jade           = require('gulp-jade');

gulp.task('js', function() {
  var bowerSources = gulp.src(mainBowerFiles({filter: '**/*.js'})),
      appSources = gulp.src(config.scripts.src).pipe(angularFilesort()),
      viewsSources = gulp.src(config.views.src)
                        .pipe(jade())
                        .pipe(templateCache({ standalone: true }));

  return streamqueue({ objectMode: true }, bowerSources, viewsSources, appSources)
    .pipe(gulpif(function (file) {
      return new RegExp("^src\/").test(path.relative(file.cwd, file.path));
    }, ngAnnotate()))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('js-dev', function() {
  return gulp.src(mainBowerFiles({filter: '**/*.js'}).concat(config.scripts.src), {base: '.'})
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});
