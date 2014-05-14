var gulp = require('gulp');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    cache = require('gulp-cached'),
    livereload = require('gulp-livereload');

var version = '1.0.0';

var minifyOpts = {

};

var sassOpts = {
    includePaths: [
        '/Library/Ruby/Gems/2.0.0/gems/compass-0.12.2/frameworks/compass/stylesheets'
    ]
};

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    sass: './css'
};

var paths = {
    js: 'js/**/*.js',
    sass: 'scss/**/*.scss',
    css: 'css/**/*.css'
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat(version + '.all.js'))
        .pipe(gulp.dest(dst.js));
});

gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass(sassOpts))
        .pipe(gulp.dest(dst.sass))
        .pipe(minifyCSS(minifyOpts))
        .pipe(concat(version + '.all.css'))
        .pipe(gulp.dest(dst.css));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    var server = livereload(),
        liveReloadCallback = function(file) {
            setTimeout(function() {
                server.changed(file.path);
            }, 300);
        };

    gulp.watch(paths.js, ['js']).on('change', liveReloadCallback);
    gulp.watch(paths.sass, ['sass']).on('change', liveReloadCallback);
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('js', 'sass');
});
