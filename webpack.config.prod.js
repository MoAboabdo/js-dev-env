import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugins from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTectPlugin from "extract-text-webpack-plugin";

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vender:path.resolve(__dirname,'src/vender'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTectPlugin('[name].[contenthash].css'),
    // Hash the file using MD5 so that their names change when the content change
    new WebpackMd5Hash(),
    //Use CommensChunkPlugin to crete a separate bundle
    // of vender libraries so that they're cashed separately
    new webpack.optimize.splitChunks({
      name: 'vender'
    }),
    //Create HTML filr that includes refrence to bundled js
    new HtmlWebpackPlugins({
      template: 'src/index.html',
      minify: {
        removeComments:true,
        collapseWhitespace:true,
        removeEmptyAttributes:true,
        useShortDoctype:true,
        removeRedundantAttributes:true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash:true,
        minifyCSS:true,
        minifyJS:true,
        minifyURLs:true
      },
      inject: true,

      trackJSToken: "717a6c3f237d408a8777197c80bc31ee"
    }),

    //Eliminate duplicate package when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify Js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ExtractTectPlugin.extract('css?sourceMap')}
    ]
  }
}
