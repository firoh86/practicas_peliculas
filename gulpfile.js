const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const babel = require('gulp-babel');
const uglify = require("gulp-uglify")

//Constante para el modulo de recarga automática del sitio web al hacer cambios
const browserSync = require('browser-sync')
//Instancia del servidor de desarrollo
const server = browserSync.create()


gulp.task('js', () => {
  return gulp.src('./dev/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat("scripts-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('styles', () => {
  return gulp
    .src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compact"
      })
    )
    .pipe(
      autoprefixer()
    )
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream())
})

gulp.task('pug', function buildHTML() {
  return gulp.src('./dev/pug/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
});



gulp.task('default', () => {
  //Iniciación del servidor en el puerto 80
  server.init({
    server: './public'
  })
  gulp.watch('./dev/pug/**/*.pug', gulp.series('pug')).on('change', server.reload)
  gulp.watch('./dev/scss/**/*.scss', gulp.series('styles')).on('change', server.reload)
  gulp.watch('./dev/js/*.js', gulp.series('js')).on('change', server.reload)
})


