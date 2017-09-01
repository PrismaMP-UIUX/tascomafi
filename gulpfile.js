var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var embedlr = require('gulp-embedlr');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var config = require('./config.json');
var browserSync = require('browser-sync');
var mainNpmFiles = require('gulp-main-npm-files');
var include = require('gulp-file-include');

gulp.task('scripts', function() {
    return gulp.src(['app/**/*.js'], {base: 'app/js'})
        // .pipe(browserify())
        // .pipe(concat('dest.js'))
        .pipe(gulp.dest('../server/dist/'+config.name+'/js/'))
        .pipe(browserSync.stream());
});
 
gulp.task('styles', function() {
    return gulp.src(['app/**/*.scss', 'app/**/*.css'],{base:'app/sass'})
        .pipe(sass())
        .on('error', console.log)
        // .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('../server/dist/'+config.name+'/css'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function(){
    return gulp.src('../server/dist/'+config.name, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('html', function() {
    return gulp.src(['app/**/*.html', '!app/{_*,_**}'])
    //return gulp.src(['app/**/*.html'])
        .pipe(embedlr())
        .pipe(include({prefix: '@@', basepath: '@file'}))
        .pipe(gulp.dest('../server/dist/'+config.name))
        .pipe(browserSync.stream());
})

gulp.task('assets', ['images', 'fonts', 'videos']);

gulp.task('images', function() {
    return gulp.src(config.images+'**/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('../server/dist/'+config.name))
        .pipe(browserSync.stream());    
});

gulp.task('videos', function() {
    return gulp.src(config.videos+'**/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('../server/dist/'+config.name))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*', {base: 'app'})
        .pipe(gulp.dest('../server/dist/'+config.name))
        .pipe(browserSync.stream());
});

// gulp.task('libs', function() {
//     return gulp.src(mainNpmFiles())
//         .pipe(gulp.dest('../server/dist/node_modules');
// });

gulp.task('serve', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000/"+config.name,
        files: ["**/*.*"],
        port: 7000,
    });
    gulp.watch(['app/**/*.js'], ['scripts']);
    gulp.watch(['app/**/*.scss', 'app/**/*.css'], ['styles']);
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(config.images+'**/*', ['images']);
    gulp.watch('app/fonts/**/*', ['images']);
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.js'], ['scripts']);
    gulp.watch(['app/**/*.scss', 'app/**/*.css'], ['styles']);
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(config.images+'**/*', ['images']);
    gulp.watch('app/fonts/**/*', ['images']);
});

gulp.task('default', ['scripts', 'styles', 'html', 'assets']);