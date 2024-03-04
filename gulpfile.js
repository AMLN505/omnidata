const { src, dest, series, watch, task } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-imagemin')
const webp = require('gulp-webp')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()
const sass = require('sass')
const gulpSass = require('gulp-sass')
const webpackStream = require('webpack-stream')


const mainSass = gulpSass(sass);

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist/js'))
}

const fonts = () => {
    return src('src/fonts/**')
        .pipe(dest('dist/fonts'))
}

const stylesDev = () => {
    return src(['src/styles/**/*.scss',
        'src/styles/**/*.css'])
        .pipe(mainSass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/style'))
        .pipe(browserSync.stream())
}

const stylesBuild = () => {
    return src(['src/styles/**/*.scss',
        'src/styles/**/*.css'])
        .pipe(mainSass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/style'))
}

const htmlMinifyDev = () => {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinifyBuild = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
}

const svg = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(dest('dist/images/svg'))
}

function webpackStreamDevOf(page) {
  return webpackStream({
    mode: 'development',
    output: {
        filename: `${page}.js`,
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: "defaults"
                        }]
                    ]
                }
            }
        }]
    },
    devtool: 'source-map'
})
}

function webpackStremBuildOf(page) {
  return webpackStream({
    mode: 'production',
    output: {
        filename: `${page}.js`,
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: "defaults"
                        }]
                    ]
                }
            }
        }]
    },
    devtool: false
})
}

const generalScriptsDev = () => {
  return src('src/js/general/**/*.js')
      .pipe(webpackStreamDevOf('general'))
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream())
}

const generalScriptsBuild = () => {
  return src('src/js/general/**/*.js')
        .pipe(webpackStremBuildOf('general'))
        .pipe(uglify().on('error', notify.onError()))
        .pipe(dest('dist/js'))
}

const mainScriptsDev = () => {
    return src('src/js/main/**/*.js')
        .pipe(webpackStreamDevOf('main'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

const mainScriptsBuild = () => {
    return src('src/js/main/**/*.js')
          .pipe(webpackStremBuildOf('main'))
          .pipe(uglify().on('error', notify.onError()))
          .pipe(dest('dist/js'))
}

const aboutScriptsDev = () => {
  return src('src/js/about/**/*.js')
        .pipe(webpackStreamDevOf('about'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

const aboutScriptsBuild = () => {
  return src('src/js/about/**/*.js')
        .pipe(webpackStremBuildOf('about'))
        .pipe(uglify().on('error', notify.onError()))
        .pipe(dest('dist/js'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/**/*.jpeg',
        'src/images/*.svg',
        'src/images/*.gif'
    ])
        .pipe(image())
        .pipe(dest('dist/images'))
}

watch('src/**/*.html', htmlMinifyDev)
watch('src/styles/**/*.scss', stylesDev)
watch('src/images/svg/**/*.svg', svg)
watch('src/js/general/**/*.js', generalScriptsDev)
watch('src/js/main/**/*.js', mainScriptsDev)
watch('src/js/about/**/*.js', aboutScriptsDev)

exports.dev = series(clean, resources, fonts, htmlMinifyDev, generalScriptsDev, mainScriptsDev, aboutScriptsDev, stylesDev, images, svg, watchFiles)
exports.build = series(clean, resources, fonts, htmlMinifyBuild, generalScriptsBuild, mainScriptsBuild, aboutScriptsBuild, stylesBuild, images, svg)
