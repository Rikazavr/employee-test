var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin'),
    csso = require('gulp-csso'),
    order = require("gulp-order");



gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})


gulp.task('prefix', () =>
    gulp.src('assets/styles/**/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/scss'))
);


gulp.task('sass', function () { 
    gulp.src('./assets/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('./assets/css/'));
});


gulp.task('concat', function () {
  return gulp.src('./assets/css/**/*.css')
    .pipe(order([
        "global.css",
        "container.css",
        "package.css",
        "icon-wrapper.css",
        "option-list.css",
        "list",
        "price",
        "button",
        "ruble-icon"
    ]))
    .pipe(concatCss("site.css"))
    .pipe(gulp.dest('./public/css/'));
});


gulp.task('imagemin', function() {
    gulp.src('./assets/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./public/images/'))
});


gulp.task('watch', function () {
    gulp.watch('public/*.html', browserSync.reload);
    gulp.watch('./assets/styles/**/*.scss', ['sass']);
    gulp.watch('./assets/css/**/*.css', ['concat']);
});