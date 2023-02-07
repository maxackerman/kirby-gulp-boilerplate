import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync  from 'browser-sync';
import concat from 'gulp-concat';
import {deleteAsync} from 'del';
import dotenv from 'dotenv';
import sourcemaps from 'gulp-sourcemaps';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';

dotenv.config()

const clean = await deleteAsync(['assets/css','assets/js']);

const serve = (done) => {
  browserSync({
    proxy: process.env.LOCAL_URL,
    open: 'external',
    ghostMode: false
  })
  done()
}

const stylesDev = () => {
  return gulp.src('src/css/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({ stream: true }));
}

const stylesProd = (watch) => {
  return gulp.src('src/css/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'))
}

const scriptsDev = () => {
  return gulp.src('./src/js/index.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('assets/js'))
}

const scriptsProd = () => {
  return gulp.src('./src/js/index.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('assets/js'))
}

function reload(done){
  browserSync.reload();
  done();
}

const watch = () => {
  gulp.watch('src/**/*.scss', stylesDev)
  gulp.watch('src/**/*.js', gulp.series(scriptsDev, reload))
  gulp.watch('site/**/*.php', reload)
}

const dev = gulp.series(clean, stylesDev, scriptsDev, serve, watch)
const build = gulp.series(clean, stylesProd, scriptsProd)

export { dev, build };