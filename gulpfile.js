var gulp = require('gulp')
var del = require('del')
var connect = require('gulp-connect-php')
var browserSync  = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var babel = require('babelify')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var log = require('gulplog')

const clean = () => del(['assets/css','assets/js'])

const serve = (done) => {
  // start PHP server
  connect.server({
    stdio: 'ignore',
    router: 'kirby/router.php'
  }, function (){
    // run through browsersync
    browserSync({
      proxy: 'http://127.0.0.1:8000',
      open: 'external',
      ghostMode: false
    })
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
  var b = browserify({
    entries: 'src/js/index.js',
    debug: true
  })
  return b
    .transform(babel.configure({ presets: ["@babel/preset-env"] })).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js'))
}

const scriptsProd = () => {
  var b = browserify({
    entries: './src/js/index.js',
    debug: false
  })
  return b
    .transform(babel.configure({ presets: ['@babel/preset-env'] }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', log.error)
    .pipe(gulp.dest('./assets/js'))
}

function reload(done){
  browserSync.reload();
  done();
}

const watch = () => {
  gulp.watch('src/**/*.scss', stylesDev)
  gulp.watch('src/**/*.js', gulp.series(scriptsDev, reload))
  gulp.watch('**/*.php', reload)
}

const dev = gulp.series(clean, stylesDev, scriptsDev, serve, watch)
const build = gulp.series(clean, stylesProd, scriptsProd)

exports.default = dev
exports.build = build