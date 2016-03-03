var gulp = require('gulp');
var tsc = require('gulp-tsc');
var exec = require('child_process').exec;
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('tsc-compile', function(){
  gulp.src(['src/**/*.ts'])
    .pipe(tsc())
    .pipe(gulp.dest('dest/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('tsc-watch', ["tsc-compile", "browser-sync"], function () {
  gulp.watch('src/**/*.ts', ['tsc-compile']);
});

gulp.task('node-run', function (cb) {
  exec('node dest/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})