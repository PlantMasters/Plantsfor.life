var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var ngAnnotate = require('gulp-ng-annotate');
var server = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

var watcher = gulp.watch(['./main/js/**/*.js', './main/styles/*.scss', './main/styles/*.css', './main/views/**/**/*.html', './main/*.html'], ['default']);
watcher.on('change', function( event ) {
        console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date() + ' , running tasks...');
});

gulp.task('sass', function() {
    gulp.src('./main/styles/*.scss')
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/styles'));
});
gulp.task('css', function() {
  gulp.src('./main/styles/*.css')
  .pipe(uglifycss())
  .pipe(gulp.dest('./public/styles'));
});
gulp.task('javascript', function() {
    gulp.src('./main/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./public/scripts'));
});
gulp.task('html', function() {
    gulp.src('./main/views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public/views'));
});
gulp.task('index', function() {
    gulp.src('./main/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public'));
});
gulp.task('run', function() {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})
gulp.task('default', ['sass', 'css', 'javascript', 'html', 'index', 'run']);
