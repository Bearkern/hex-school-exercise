var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var pump = require('pump');

gulp.task('copyHTML', function(){
  return gulp.src('./source/**/*.html')
  .pipe(gulp.dest('./public/'))
})

gulp.task('jade', function () {
  // var YOUR_LOCALS = {};
  gulp.src('./source/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
});

gulp.task('sass', function () {
  var plugins = [
    autoprefixer({ browsers: ['last 3 version', '> 5%'] })
  ];

  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    // 編譯完成
    .pipe($.postcss(plugins))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
});

gulp.task('babel', function () {
    gulp.src('./source/js/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel({
          presets: ['env']
      }))
      .pipe($.concat('all.js'))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js'))
      .pipe(browserSync.stream())
});

gulp.task('bower', function () {
  return gulp.src(mainBowerFiles({
    'overrides': {
      'vue': {
        'main': 'dist/vue.js'
      },
      'tether': {
        'ignore': 'true'
      }
    }
  }))
    .pipe($.uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest('./.tmp/vendors'));
    cb(err);
});

gulp.task('vendorJs', ['bower'], function() {
  return gulp.src('./.tmp/vendors/**/**.js')
    .pipe($.order([
      'jquery.js',
      // 'bootstrap.js'
    ]))
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest('./public/js'))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/*.jade', ['jade']);
  gulp.watch('./source/js/**/*.js', ['babel']);
});

gulp.task('default', ['jade', 'sass', 'babel', 'browser-sync', 'watch', 'vendorJs']);