const gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('./css/'));
});

gulp.task('default', () => {
    gulp.watch('./scss/*.scss', ['sass']);
});