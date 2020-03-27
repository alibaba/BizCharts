const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const pagckageJSON = require('./package.json');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

/* invoke */
const packageName = 'BizChartsPlot';

const config = {
  mode: 'production',
  entry: {
    index: ['./src/index.tsx']
  },
  output: {
    filename: '[name].js',
    library: packageName,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      // shared: path.resolve(__dirname, '../shared'),
      utils: path.resolve(__dirname, './src/utils'),
      'bizcharts-plot': path.resolve(__dirname, './src'),
    }
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  module: {
    rules: [{
        test: /\.s?css$/,
        use: ['style-loader', 'raw-loader', 'sass-loader'],
        include: [path.resolve(__dirname, '../css/')],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['airbnb'],
          },
        }, ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: [
              ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
            ]
          }
        }],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: [
              ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
            ]
          }
        }, {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: !isProduction,
      __VERSION__: pagckageJSON.version,
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        extractComments: 'all',
        compress: {
          drop_console: true,
        },
      }
    })],
  },
  devtool: 'source-map',
};

if (env === 'production') {
  if (process.env.npm_config_report) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info',
      })
    );
  }
}

if (env === 'development') {
  config.devServer = {
    contentBase: path.join(__dirname, 'demo'),
    // compress: true,
    port: 9000
  };
}

module.exports = config;
