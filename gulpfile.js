import gulp from 'gulp';
import browserSync  from 'browser-sync';
import {deleteAsync, deleteSync} from 'del';
import dotenv from 'dotenv';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import webpack from 'webpack-stream';

dotenv.config()

const clean = (done) => {
  deleteSync(['assets/css','assets/js'])
  done()
};

const serve = (done) => {
  browserSync({
    proxy: process.env.LOCAL_URL,
    open: 'external',
    ghostMode: false
  })
  done()
}

const stylesDev = () => gulp.src('src/css/index.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.reload({ stream: true }));

const stylesProd = (watch) => gulp.src('src/css/index.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest('assets/css'))

const scriptsDev = () => gulp.src('./src/js/index.js')
  .pipe(webpack({
    output: {
      filename: 'app.js',
    },
    mode: 'development',
    devtool: 'source-map'
  }))
  .pipe(gulp.dest('assets/js'));

const scriptsProd = () => gulp.src('./src/js/index.js')
  .pipe(webpack({
    output: {
      filename: 'app.js',
    },
    mode: 'production'
  }))
  .pipe(gulp.dest('assets/js'));

const reload = (done) => {
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