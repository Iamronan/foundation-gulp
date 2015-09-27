// Load Gulp plugins

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');


// Paths

var paths = {
    'bower' : './bower_components/',
    'assets' : './assets/'
};

// Styles

gulp.task('styles', function() {
    return gulp.src([
        './assets/styles/app.scss'
        ])
    .pipe(sass({
        includePaths: [
        paths.bower + 'foundation/scss'
        ]
        }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css'))
    .pipe(notify({ message: 'Styles task complete' }));

    });

// Scripts

gulp.task('scripts', function() {
    gulp.src([
         paths.bower + 'jquery/dist/jquery.js',
         paths.bower + 'foundation/js/foundation.js',
         paths.bower + 'foundation/js/foundation/foundation.alert.js',
         paths.assets + 'scripts/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
    
     return gulp.src( paths.bower + 'modernizr/modernizr.js')
        .pipe(gulp.dest('./public/js'));

});

// Tasks

gulp.task('watch', function() {
  gulp.watch(paths.assets + 'styles/**/*.scss', ['styles']);
  gulp.watch(paths.assets + 'scripts/**/*.js', ['scripts']);

// Create LiveReload server
  livereload.listen();

// Watch any files in dist/, reload on change
  gulp.watch(['./public/**']).on('change', livereload.changed);
  
});



gulp.task('default', ['styles', 'scripts']);

