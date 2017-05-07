var gulp = require('gulp');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');

var distPath = './dist';
var paths = {
    dist: distPath,
    jsDist: distPath + '/js',
    fontsDist: distPath + '/fonts',
    l18nDist: distPath + '/l18n',
    app: './app',
    bower: './bower_components',
    backendResources: '../backend/src/main/resources/static'
};

var globs = {
    dist: paths.dist + '/**/*',
    allJs: paths.app + '/**/*.js',
    indexHtml: paths.app + '/index.html',
    templates: paths.app + '/components/**/*.html',
    allCss: paths.app + '/**/*.css',
    bowerJs: paths.bower + '/**/*.min.js',
    bootstrapCss: paths.bower + '/bootstrap/dist/css/*.min.css',
    glyphiconFonts: paths.bower + '/bootstrap/dist/fonts/*.*',
    l18n: paths.app + '/l18n/*.json',
    cameraPreview: 'cordova/plugins/cordova-plugin-camera-preview/www/*.js',
    adapter: paths.bower + '/webrtc-adapter/release/adapter.js'
};

gulp.task('clean', ['clean:dist']);

gulp.task('clean:dist', function() {
    return gulp.src(paths.dist, {read: false}).pipe(clean());
});

gulp.task('connect', ['build'], function (done) {
    connect.server({
        root: paths.dist,
        livereload: true
    });
    done();
});

gulp.task('build:js:custom', ['lint'], function() {
    return gulp.src(globs.allJs)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.jsDist));
});

gulp.task('build:js:3rdparty', function() {
    return gulp.src([globs.bowerJs, globs.cameraPreview, globs.adapter])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(paths.jsDist));
});

gulp.task('build:js', ['build:js:custom', 'build:js:3rdparty']);

gulp.task('lint', function() {
    return gulp.src(globs.allJs)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build:html', ['build:html:copy-index', 'build:html:directive-templates']);

gulp.task('build:html:copy-index', function() {
    return gulp.src(globs.indexHtml)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:html:directive-templates', function() {
    return gulp.src(globs.templates)
        .pipe(templateCache('templates.js', {
            module: 'magwebapp.templates',
            standalone: true
        }))
        .pipe(gulp.dest(paths.jsDist));
});

gulp.task('build:css', function () {
    return gulp.src([globs.allCss, globs.bootstrapCss])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:l18n', function() {
    return gulp.src(globs.l18n)
        .pipe(gulp.dest(paths.l18nDist));
});

gulp.task('build:fonts', function() {
    return gulp.src(globs.glyphiconFonts)
        .pipe(gulp.dest(paths.fontsDist));
});

gulp.task('build', ['build:js', 'build:html', 'build:css', 'build:l18n', 'build:fonts']);

gulp.task('copy-resources-to-backend', function () {
    return gulp.src(globs.dist)
        .pipe(gulp.dest(paths.backendResources));
});

gulp.task('watch', function () {
    gulp.watch(globs.allJs, ['build:js']);
    gulp.watch(globs.indexHtml, ['build:html:copy-index']);
    gulp.watch(globs.templates, ['build:html:directive-templates']);
    gulp.watch(globs.allCss, ['build:css']);
    gulp.watch(globs.l18n, ['build:l18n']);
    gulp.watch(globs.dist, ['copy-resources-to-backend'])
});

gulp.task('dev', ['build', 'connect', 'watch']);