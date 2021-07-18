const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   }

   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetWebpackPlugin(),
         new TerserWebpackPlugin()
      ]
   }

   return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
   const loaders = [
      {
         loader: MiniCssExtractPlugin.loader,
         options: {
            hmr: isDev,
            reloadAll: true
         },
      },
      'css-loader'
   ]

   if (extra) {
      loaders.push(extra)
   }

   return loaders
}

const babelOptions = preset => {
   const opts = {
      presets: [
         '@babel/preset-env'
      ],
      plugins: [
         '@babel/plugin-proposal-class-properties'
      ]
   }

   if (preset) {
      opts.presets.push(preset)
   }

   return opts
}


const jsLoaders = () => {
   const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
   }]

   if (isDev) {
      loaders.push('eslint-loader')
   }

   return loaders
}

const plugins = () => {
   const base = [
      new HTMLWebpackPlugin({
         template: '../src/html/index.html',
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
         {
            from: path.resolve(__dirname, './src/assets/images'),
            to: path.resolve(__dirname, 'dist/assets/images'),
            noErrorOnMissing: true
         },
         {
            from: path.resolve(__dirname, './src/assets/fonts'),
            to: path.resolve(__dirname, 'dist/assets/fonts'),
            noErrorOnMissing: true
         }
      ]),

      // new CopyWebpackPlugin({
      //    patterns: [
      //       {
      //          from: path.resolve(__dirname, 'src/favicon.ico'),
      //          to: path.resolve(__dirname, 'dist')
      //       }
      //    ]
      // }),
      new MiniCssExtractPlugin({
         filename: filename('css')
      })
   ]

   if (isProd) {
      base.push(new BundleAnalyzerPlugin())
   }

   return base
}

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
      main: path.resolve(__dirname, './src/scripts/index.js')
   },
   output: {
      filename: filename('js'),
      path: path.resolve(__dirname, './dist')
   },
   resolve: {
      extensions: ['.js', '.json'],
      alias: {
         '@models': path.resolve(__dirname, 'src/models'),
         '@': path.resolve(__dirname, 'src'),
      }
   },
   optimization: optimization(),
   devServer: {
      port: 4200,
      hot: isDev
   },
   devtool: isDev ? 'source-map' : '',
   plugins: plugins(),
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: cssLoaders()
         },
         {
            test: /\.less$/i,
            use: cssLoaders('less-loader')
         },
         {
            test: /\.s[ac]ss$/i,
            use: cssLoaders('sass-loader')
         },
         {
            test: /\.(png|jpg|svg|gif)$/i,
            use: ['file-loader']
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/i,
            use: ['file-loader']
         },
         {
            test: /\.xml$/i,
            use: ['xml-loader']
         },
         {
            test: /\.csv$/i,
            use: ['csv-loader']
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()
         },
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: {
               loader: 'babel-loader',
               options: babelOptions('@babel/preset-typescript')
            }
         },
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: {
               loader: 'babel-loader',
               options: babelOptions('@babel/preset-react')
            }
         }
      ]
   }
}