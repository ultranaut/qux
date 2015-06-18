'use strict';
var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var lint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var srcFile = 'src/*.js';

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('lint', function () {
  // run as async so that minify won't run if there are errors
  return gulp.src(srcFile)
             .pipe(plumber())
             .pipe(lint())
             .pipe(lint.format())
             .pipe(lint.failOnError());
});

gulp.task('minify', ['lint'], function () {
  gulp.src(srcFile)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['lint', 'clean', 'minify'], function () {
  gulp.src(srcFile)
      .pipe(gulp.dest('dist/'));
});

/* --- watch ------------------------------------------------------- */
gulp.task('watch', function () {
  gulp.watch(srcFile, ['lint']);
});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['lint', 'watch']);
