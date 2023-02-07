import gulp from 'gulp';
import {deleteAsync} from 'del';
import dotenv from 'dotenv';
import browserSync  from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import webpack from 'webpack-stream';

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
    .pipe(webpack({
      stats: {
        // less info in console
        entrypoints: false,
        children: false
      },
      output: {
        filename: 'app.js',
      },
      mode: 'development',
      devtool: 'source-map',
      module: {
        rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
              // plugins: ['@babel/plugin-syntax-dynamic-import']
            }
          }
        }
        ]
      }
    }))
    .pipe(gulp.dest('assets/js'));
}

const scriptsProd = () => {
  return gulp.src('./src/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'app.js',
      },
      mode: 'production',
      optimization: {
        usedExports: true,
      },
      devtool: false,
      module: {
        rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
              // plugins: ['@babel/plugin-syntax-dynamic-import']
            }
          }
        }
        ]
      }
    }))
    .pipe(gulp.dest('assets/js'));
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