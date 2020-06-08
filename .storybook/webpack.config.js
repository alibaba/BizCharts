const path = require('path');

module.exports = ({ config }) => {
  // babel loader is father 30%
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        '@babel/preset-typescript',
        [
          'umi',
          {
            targets: {
              browsers: ['last 2 versions'],
            },
          },
        ],
      ],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules.push(
    {
      test: /\.s?css$/,
      use: ['style-loader', 'raw-loader', 'sass-loader'],
      include: [path.resolve(__dirname, '../css/')],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['airbnb'],
          },
        },
      ],
    },
    {
      test: /\.jsx$/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['airbnb'],
          },
        },
      ],
    },
  );
  config.resolve.extensions.push('.js', '.jsx');
  config.resolve.alias={
    ...config.resolve.alias,
    '@antv/g2': path.resolve(__dirname, '../node_modules/@antv/g2'),
  }
  return config;
};
