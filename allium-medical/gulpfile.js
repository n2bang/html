'use strict';

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify-es").default,
    sass = require('gulp-sass');

var paths = {
    webroot: "./"
};

paths.js = paths.webroot + "assets/js/*.js";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.concatVendorJsDest = paths.webroot + "js/vendor.min.js";
paths.concatVendorCssDest = paths.webroot + "css/vendor.min.css";
paths.concatCss = [
    paths.webroot + "assets/sass/reset.scss",
    paths.webroot + "assets/sass/style.scss",
    paths.webroot + "assets/sass/responsive.scss"
];

//vendor path 
paths.vendorCss = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/font-awesome/css/font-awesome.css",
    "./node_modules/owl.carousel/dist/assets/owl.carousel.css",
    "./node_modules/owl.carousel/dist/assets/owl.theme.default.css",
];

paths.vendorJs = [     
    "./node_modules/jquery/dist/jquery.js",    
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./node_modules/owl.carousel/dist/owl.carousel.js",
    //"./node_modules/jquery-validation/dist/jquery.validate.js",
    //"./node_modules/jquery-validation/dist/additional-methods.js"
];

paths.fonts = [
    "./node_modules/font-awesome/fonts/**/*.*",
    // "./node_modules/bootstrap/dist/fonts/**/*.*"
];

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:concatCss", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:vendorJs", function (cb) {
    rimraf(paths.concatVendorJsDest, cb);
});

gulp.task("clean:vendorCss", function (cb) {
    rimraf(paths.concatVendorCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:concatCss", "clean:vendorJs", "clean:vendorCss"]);

gulp.task('min:concatCss', function () {
    return gulp.src(paths.concatCss)
        .pipe(concat(paths.concatCssDest))
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:js", function () {
    return gulp.src([paths.js])
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:vendorCss", function () {
    return gulp.src(paths.vendorCss)
        .pipe(concat(paths.concatVendorCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:vendorJs", function () {
    return gulp.src(paths.vendorJs)
        .pipe(concat(paths.concatVendorJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:font",function(){
  return gulp.src(paths.fonts) 
  .pipe(gulp.dest(paths.webroot + "fonts"));
});

gulp.task('watch', function () {
    gulp.watch(paths.concatCss, ['min:concatCss']);
    gulp.watch(paths.js, ['min:js']);
});

//debugging 
var pump = require('pump');
gulp.task('uglify-error-debugging', function (cb) {
    pump([
        gulp.src(paths.concatJsDest),
        uglify(),
        gulp.dest('.')
    ], cb);
});

gulp.task("default", ["min:js", "min:concatCss"]);//, "min:vendorJs", "min:vendorCss", "min:font"





