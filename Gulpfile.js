#!/usr/bin/env node
'use strict';
var gulp = require('gulp')
  , to5 = require('gulp-6to5')
  , jshint = require('gulp-jshint')

var src = 'src/**/*.js'

gulp.task('default', ['watch'])
gulp.task('dist', ['lint', 'transpile'])
 
gulp.task('transpile', function() {
  return gulp.src(src)
    .pipe(to5({ optional: ['selfContained'] }))
    .pipe(gulp.dest('lib'))
})

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('watch', ['lint', 'transpile'], function() {
  gulp.watch(src, ['transpile'])
})
