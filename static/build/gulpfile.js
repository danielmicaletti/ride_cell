var gulp = require('gulp');
//Plugins
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var gzip = require('gulp-gzip');
var plumber = require('gulp-plumber');
var bytediff = require('gulp-bytediff');


var jsSources,
	bowerJs,
	cssSources,
	bowerCss,
	outputDir;

jsSources = [
	'development/scripts/rideCell.js',
	'development/scripts/rideCell.config.js',
	'development/scripts/rideCell.routes.js',
	'development/scripts/**/**.module.js',
	'development/scripts/**/*.js',
	// 'development/js/**/*.js'
];

bowerJs = [
	'development/bower_components/jquery/dist/jquery.js',
	'development/bower_components/angular/angular.js',
	'development/bower_components/angular-animate/angular-animate.js',
	'development/bower_components/angular-ui-router/release/angular-ui-router.js',
	'development/bower_components/angular-sanitize/angular-sanitize.js',
	'development/bower_components/bootstrap/dist/js/bootstrap.js',
	'development/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
];

cssSources = [
	'development/css/main.css'
];

bowerCss = [
	'development/bower_components/bootstrap/dist/css/bootstrap.css',
];

outputDir = 'production/';

// gulp.task('scripts', function() {
// 	return gulp.src(jsSources)
// 		.pipe(concat('main.min.js'))
// 		.pipe(ngAnnotate())
// 		.pipe(uglify()
// 		.on('error', gutil.log))
// 		.pipe(gulp.dest(outputDir + 'js'));
// });

gulp.task('scripts', function() {
    return gulp.src(jsSources)
	    .pipe(plumber())
			.pipe(concat('main.js', {newLine: ';'}))
			.pipe(ngAnnotate({add: true}))
	    .pipe(plumber.stop())
        .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('scriptsMin', ['scripts'], function() {
	return gulp.src(outputDir + 'js/main.js')
		.pipe(plumber())
			.pipe(bytediff.start())
				.pipe(uglify({mangle: true}))
			.pipe(bytediff.stop())
			.pipe(rename('main.min.js'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(outputDir + 'js'));
});

// gulp.task('bowerScripts', function() {
// 	return gulp.src(bowerJs)
// 		.pipe(concat('bower.min.js'))
// 		.pipe(ngAnnotate())
// 		.pipe(uglify()
// 		.on('error', gutil.log))
// 		.pipe(gulp.dest(outputDir + 'js'));
// });

gulp.task('bowerScripts', function() {
    return gulp.src(bowerJs)
	    .pipe(plumber())
			.pipe(concat('bower.js', {newLine: ';'}))
			.pipe(ngAnnotate({add: true}))
	    .pipe(plumber.stop())
        .pipe(gulp.dest(outputDir + 'js'));
});


gulp.task('bowerMin', ['bowerScripts'], function() {
	return gulp.src(outputDir + 'js/bower.js')
		.pipe(plumber())
			.pipe(bytediff.start())
				.pipe(uglify({mangle: true}))
			.pipe(bytediff.stop())
			.pipe(rename('bower.min.js'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('styles', function() {
	return gulp.src(cssSources)
		.pipe(concat('main.min.css'))
		.pipe(cleanCSS()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('bowerStyles', function() {
	return gulp.src(bowerCss)
		.pipe(concat('bower.min.css'))
		.pipe(cleanCSS()
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('gzipJs', function() {
    return gulp.src(['production/js/main.min.js', 'production/js/bower.min.js'])
    .pipe(gzip({ preExtension: 'gz' }))
    .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('gzipCss', function() {
    return gulp.src(['production/css/main.min.css', 'production/css/bower.min.css'])
    .pipe(gzip({ preExtension: 'gz' }))
    .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('views', function() {
	gulp.src('development/views/**/*.*')
		.pipe(gulp.dest(outputDir + 'views'));
});

gulp.task('fonts', function() {
	gulp.src('development/fonts/**/*.*')
		.pipe(gulp.dest(outputDir + 'fonts'));
});

gulp.task('images', function() {
	gulp.src('development/images/**/*.*')
		.pipe(gulp.dest(outputDir + 'images'));
});
// Build runs
gulp.task('default', ['scripts', 'scriptsMin','bowerScripts', 'bowerMin', 'styles', 'bowerStyles', 'views', 'fonts', 'images']);

