/* eslint-disable no-unused-expressions */
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

function buildDist(cb) {
  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(err);
    }

    gutil.log(
      stats.toString({
        colors: true,
        chunks: false,
      }),
    );
  });
  compiler.plugin('done', stats => {
    console.log(stats);
    if (stats.hasErrors()) {
      console.log(
        stats.toString({
          colors: true,
        }),
      );
    }
    cb && cb();
  });
}


exports.default = gulp.series(buildDist);
