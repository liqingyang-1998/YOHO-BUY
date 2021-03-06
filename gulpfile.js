const { src, dest, series, parallel, watch } = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const { createProxyMiddleware } = require('http-proxy-middleware');
function compileCss() {
    return src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(dest('./src/css/'))
}

function server() {
    return src('./src/')
        .pipe(webserver({
            port: 9090,
            livereload: true,
            // directoryListing: true,
            open: './index.html',
            middleware: [
                // /api代理有货网
                createProxyMiddleware('/api', {
                    target: 'https://www.yohobuy.com/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                })
            ]
        }))
}

function watchFile() {
    watch('./src/sass/**/*.scss', compileCss);
}

exports.default = series(parallel( compileCss), server, watchFile);