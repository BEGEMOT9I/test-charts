const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const manifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = new Config().merge({
  context: path.resolve(__dirname, './'),
  mode: 'development',
  entry: {
    client: ['./src/index']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets',
    path: path.resolve(__dirname, 'public/webpack'),
    pathinfo: false
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_compontents)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /sprite/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({ interlaced: false }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-optipng')({ optimizationLevel: 5 }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2,
                  quality: 60
                }),
                require('imagemin-svgo')({
                  plugins: [{ removeTitle: true }, { convertPathData: false }]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: (m, c) => m.constructor.name === 'CssModule',
          chunks: 'all',
          enforce: true,
          minSize: 1
        }
      }
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      tslint: path.resolve(__dirname, './tslint.json'),
      checkSyntacticErrors: true,
      tslint: false,
      memoryLimit: 1024,
      workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
      async: true
    }),
    new manifestPlugin({
      publicPath: '/',
      writeToFileEmit: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: '3030',
    hot: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    compress: true,
    progress: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  },
  externals: []
})
