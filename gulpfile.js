/* jshint node: true */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var jshint = require('gulp-jshint');

var config = {
  jsFilesSrc: 'src/**/*.js',
  jsHintRules: [],
};

gulp.task('lint', function () {
  gulp.src(config.jsFilesSrc)
      .pipe(plumber())
      .pipe(jshint(config.jsHintRules))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({ message: 'mistakes were made.' }));
});

/* --- watch ------------------------------------------------------- */
gulp.task('watch', function () {
  gulp.watch(config.jsFilesSrc, ['lint']);

});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['lint', 'watch']);


