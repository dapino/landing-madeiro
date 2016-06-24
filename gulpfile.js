var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var htmlmin = require('gulp-htmlmin');
var plumberErrorHandler = { errorHandler: notify.onError({
	title: 'Gulp',
	message: 'Error: <%= error.message %>'
	})
};

gulp.task('html', function () {
	gulp.src('./src/html/*.html')
		.pipe(plumber(plumberErrorHandler))
		.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
		.pipe(livereload());
});

gulp.task('styles', function() {
	gulp.src('./src/css/*.{sass, scss}')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sass())
		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
 
});
gulp.task('scripts', function () {
	gulp.src('./src/js/*.js')
		.pipe(plumber(plumberErrorHandler))
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./dist'))
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
	gulp.watch('./src/css/*.{scss,sass}', ['styles']);
	gulp.watch('./src/js/*.js', ['scripts']);
	gulp.watch('./src/img/*.{png,jpg,gif}', ['img']);
	gulp.watch('./src/html/*html', ['html']);
});

gulp.task('default', ['html', 'styles', 'scripts', 'img', 'watch']);