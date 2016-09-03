var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var rjs = require('gulp-requirejs');
var amdOptimize = require('gulp-requirejs-optimize');
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: {baseDir:'./'},
        startPath:'html/index.html'
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("main.scss", ['sass']);
    gulp.watch("js/*.js").on('change', reload);
    gulp.watch("html/*.html").on('change', reload);
});

gulp.task('sass',function(){
    return gulp.src('main.scss')
        .pipe(sourcemaps.init())
    	.pipe(scss())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
       // .pipe(minifycss)

});

gulp.task('build',['sass'],function(){
    rjs({
        baseUrl:"./js",
        name:"almond",
        include:['main'],
        out:"build.js",
        paths:{
            'artTemplate':'template-native',
            'jquery':'jquery'
        }
    })
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

