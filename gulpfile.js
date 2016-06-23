var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var plumberErrorHandler = { errorHandler: notify.onError({
	title: 'Gulp',
	message: 'Error: <%= error.message %>'
	})
};

    .pipe(gulp.dest('./css'));

gulp.task('styles', function() {
	gulp.src('./src/css/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sass().
		.pipe(gulp.dest('./dist/css'))
		.pipe(livereload());
 
});
gulp.task('scripts', function () {
	gulp.src('./src/js/*.js')
		.pipe(plumber(plumberErrorHandler))
		.pipe(concat('theme.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		.pipe(livereload());
});

gulp.task('img', function() {
	gulp.src('./src/img/*.{png,jpg,gif}')
		.pipe(plumber(plumberErrorHandler))
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe(gulp.dest('./dist/img'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/css/*.scss', ['styles']);
	gulp.watch('./src/js/*.js', ['scripts']);
	gulp.watch('./src/img/*.{png,jpg,gif}', ['img']);
	gulp.watch('./dist/*.html', ['default']);
});
gulp.task('default', ['styles', 'scripts', 'img', 'watch'])