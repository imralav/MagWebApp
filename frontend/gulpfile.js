var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var distPath = './dist';
var distGlob = distPath + '/**/*';
var appPath = './app';
var bowerComponentsPath = './bower_components';
var minJsGlob = '/**/*.min.js';
var bowerJsGlob = bowerComponentsPath + minJsGlob;
var jsGlob = '/**/*.js';
var allJsGlob = appPath + jsGlob;
var allHtmlGlob = appPath + '/**/*.html';
var allCssGlob = appPath + '/**/*.css';

var backendResourcesPath = '../backend/src/main/resources/static';

gulp.task('connect', ['build'], function (done) {
    connect.server({
        root: distPath,
        livereload: true
    });
    done();
});

gulp.task('build-js', function () {
    return gulp.src([bowerJsGlob, allJsGlob])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distPath));
});
gulp.task('build-html', function () {
    return gulp.src(allHtmlGlob)
        .pipe(gulp.dest(distPath));
});

gulp.task('build-css', function () {
    return gulp.src(allCssGlob)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(distPath));
});

gulp.task('build', ['build-js', 'build-html', 'build-css']);
gulp.task('copy-resources-to-backend', function () {
    return gulp.src(distGlob)
        .pipe(gulp.dest(backendResourcesPath));
});

gulp.task('watch', function () {
    gulp.watch(allJsGlob, ['build-js']);
    gulp.watch(allHtmlGlob, ['build-html']);
    gulp.watch(allCssGlob, ['build-css']);
    gulp.watch(distGlob, ['copy-resources-to-backend'])
});

gulp.task('dev', ['build', 'connect', 'watch']);