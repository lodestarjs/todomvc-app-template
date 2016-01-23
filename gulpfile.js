var gulp = require('gulp'),
  rm = require('gulp-rimraf'),
  path = require('path'),
  babel = require( 'rollup-plugin-babel' ),
  rollup = require('gulp-rollup')
  sourcemaps = require('gulp-sourcemaps'),
  ractive = require('gulp-ractive'),
  concat = require('gulp-concat'),
  declare = require('gulp-declare'),
  connect = require('gulp-connect');

gulp.task('clean', function() {
  return gulp.src('assets').pipe(rm());
});

gulp.task('copy', function() {
  gulp.src(['node_modules/ractive/ractive.js', 'node_modules/ractive/ractive.js.map', 'node_modules/lodestar-ractive/dist/lodestar-ractive.js', 'node_modules/todomvc-common/base.js', 'node_modules/ractive-transitions-slide/dist/ractive-transitions-slide.js'])
    .pipe(gulp.dest('dist/assets/js/'));
  gulp.src(['./app/index.html'])
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
  gulp.src(['node_modules/todomvc-app-css/index.css', 'node_modules/todomvc-common/base.css', 'css/app.css'])
    .pipe(gulp.dest('dist/assets/css/'));
});


gulp.task('precompile', function() {
  return gulp.src('app/views/**/*.html')
    .pipe(ractive({
      preserveWhitespace: true
    }))
    .pipe(declare({
      namespace: 'Templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(connect.reload());
});


gulp.task('rollup', function() {
  return gulp.src('./app/main.js', {read: false})
    .pipe(rollup({
      format: 'iife',
      moduleName: 'main',
      sourceMap: true,
      plugins: [
        babel()
      ],
      external: [ 'lodestar-ractive' ]
    }))
    .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', [ 'rollup' ]);
  gulp.watch('./app/views/**/*.html', [ 'precompile' ]);
  gulp.watch('./app/index.html', [ 'copy' ]);
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['copy', 'rollup', 'precompile', 'connect', 'watch']);

gulp.task('build', ['copy', 'rollup', 'precompile']);