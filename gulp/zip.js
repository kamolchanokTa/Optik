const gulp = require('gulp');
const zip = require('gulp-zip');
const appJson = require('../app.json');

gulp.task('zip', function () {
    return gulp.src([
        './public/**/*.js',
        './services/**/*.js',
        './bower_components/**/*',
        './*.js',
        './*.json',
        './*.html',
    ], { "base": './' })
        .pipe(zip(appJson.name + '_' + appJson.version + '.zip'))
        .pipe(gulp.dest('.'));
});