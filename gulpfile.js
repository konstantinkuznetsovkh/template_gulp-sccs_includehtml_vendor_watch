/*global require*/
((r) => {
	'use strict';
	const gulp = r('gulp'),
		watch = r('gulp-watch'),
		html_include = r('gulp-file-include'),
		scss = r('gulp-sass'),
		autoprefixer = r('gulp-autoprefixer'),
		filesize = r('gulp-filesize');
	// this start tasks for developer///////////////////////////////
	gulp.task('html_include', () => {
		return gulp.src(['developer/html/index.html'])
			.pipe(filesize())
			.pipe(html_include({
				prefix: '@!',
				basepath: '@file'
			}))
			.pipe(gulp.dest('developer'))
			.pipe(filesize());
	});
	gulp.task('css', () => {
		return gulp.src('developer/scss/all.scss').pipe(scss())
			.pipe(filesize())
			.pipe(autoprefixer({
				browsers: ['last 22 versions'],
				cascade: false
			}))
			.pipe(gulp.dest('developer/css'))
			.pipe(filesize());
	});

	gulp.task('watch', () => {
		watch('developer/scss/**/*.scss');
		watch('developer/html/**/*.html');
		gulp.watch('developer/scss/**/*.scss', ['scss']);
		gulp.watch('developer/html/**/*.html', ['html_include']);
	});
	// this end tasks for developer////////////////////////////////
	gulp.task('default', ['css', 'watch', 'html_include']);
})(require);