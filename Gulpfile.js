'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');

//precess and move images to public/img
gulp.task('images', () =>
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'))
);

//compile scss files and move them to public/css
gulp.task('styles', () => {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

//move js files to public/js
gulp.task('scripts', () => {
    gulp.src('js/**/*.js')
        // .pipe(babel({
        //       presets: ['es2015']
        //   }))
        // .pipe(concat('concat.js'))
        // .pipe(gulp.dest('public/js'))
        // .pipe(rename('sound.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['scripts'], function(done) {
    browserSync.reload();
    done();
});

//used mostly for livereloading
gulp.task('browser-sync', ['scripts', 'styles', 'nodemon', 'images'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google-chrome",
        port: 7000,
    });

    gulp.watch("scss/*.scss", ['styles']);
    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

//restart node server
gulp.task('nodemon', function(cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function() {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

//default task
gulp.task('default', ['browser-sync']);
