/*
  Author: Theme designed and developed by Michael Palmer, MP Web.
  Website: https://www.michaelpalmerwebdesign.com.
  Copyright MP Web 2018.
  Theme website: https://www.brutalist.design.
*/
"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  cssmin = require('gulp-cssmin');

gulp.task("concatScripts", function () {
  return gulp.src([
    '_/js/vendor/popper.min.js',
    '_/js/vendor/bootstrap.min.js',
    '_/js/main.js'
  ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
  return gulp.src("js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
});

gulp.task('compileSass', function () {
  return gulp.src("_/sass/main.scss")
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task("minifyCss", ["compileSass"], function () {
  return gulp.src("css/main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('watchFiles', function () {
  gulp.watch('_/sass/**/*.scss', ['compileSass', 'minifyCss']);
  gulp.watch('_/js/*.js', ['concatScripts', 'minifyScripts']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['watchFiles'], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch("_/sass/**/*.scss", ['watchFiles']);
  gulp.watch("*.html").on('change', browserSync.reload);
});
