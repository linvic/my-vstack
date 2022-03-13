const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Happypack = require('happypack');
const { env } = require('process');

const plugins = [
  new Happypack({
    id: 'babel',
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript",],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ]
          ]
        }
      }
    ]
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: path.join(__dirname, './dist/dapp/index.html'),
    inject: true,
    favicon: 'favicon.ico',
  }),
];


module.exports = {
  mode: env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/dapp/'),
    publicPath: env.NODE_ENV === 'production' ? '/dapp/' : '/',
    filename: '[name].[chunkhash:6].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  devServer: {
    port: 9002,
    historyApiFallback: true,
    proxy: {
      '/dapp/api/v1': {
        target: 'http://localhost:3000/',
        // pathRewrite: { '^/api': '' },
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
      }
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'happypack/loader',
          options: {
            id: 'babel'
          }
        }],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  'primary-color': '#07c160',
                  'link-color': '#07c160'
                },
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              name: '[name]_[hash:7].[ext]?max_age=25920000',
            },
          },
        ],
      },
    ]
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 20
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    }
  }
};