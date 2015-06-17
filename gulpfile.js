'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var lint = require('gulp-eslint');

var config = {
  jsFilesSrc: 'src/**/*.js'
};

gulp.task('lint', function () {
  gulp.src(config.jsFilesSrc)
      .pipe(plumber())
      .pipe(lint(config.jsHintRules))
      .pipe(lint.format())
      .pipe(lint.failOnError())
      .on('error', notify.onError({ message: 'mistakes were made.' }));
});

/* --- watch ------------------------------------------------------- */
gulp.task('watch', function () {
  gulp.watch(config.jsFilesSrc, ['lint']);

});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['lint', 'watch']);


