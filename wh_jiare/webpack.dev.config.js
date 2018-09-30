const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Precss = require('precss');

module.exports = {
	context: path.resolve(__dirname, "app"),
	devtool: 'eval-source-map',
	entry:  {
		main: "./main.js",
		bootstrap: bootstrapEntryPoints.prod,
		vendor: [
			"react", "react-dom", "redux",
			"react-redux", "redux-thunk", "jquery"
		]
	},

	output: {
		path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].[hash].js'
  	},

	module: {
		rules: [
			{ test: /\.json$/, use: "json-loader" },
			{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
			{ test: /\.css$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'postcss-loader'] }) },
			{ test: /\.scss$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'postcss-loader', 'sass-loader'] }) },
			{ test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
			{ test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?publicPath=../&outputPath=css/fonts/' },
			{ test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: 'file-loader?publicPath=../&outputPath=css/fonts/' },
			{
			    test: /\.(png|jpg|jpeg|gif)$/,
			    use: [{
			        loader: 'url-loader',
			        options: {
			        	publicPath: '../',
			        	limit: 1,
			            name: 'images/[name].[ext]'
			        }
			    }]
			}
    	]
  	},

	resolve: {
	    // 注意一下, extensions webpack2第一个不是空字符串! 对应不需要后缀的情况.
	    extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx'],
	    // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
	    alias: {
	        'scripts': path.resolve(__dirname, 'app/scripts')
	    }
	},

	plugins: [
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.optimize.CommonsChunkPlugin({// 提取公共代码进行打包，既能缩小核心代码包的尺寸，又能提升页面加载速度
            names: ['vendor']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    	new HtmlWebpackPlugin({
        	template: path.join(__dirname, "/app/index.tmpl.html")
    	}),
    	new webpack.LoaderOptionsPlugin({
    		options: {
      			postcss: [Precss, autoprefixer]
    		}
    	}),
		new ExtractTextPlugin({
      		filename: "css/wh_jiare.min.css"
    	}),
		new OptimizeCssAssetsPlugin({// CSS文件压缩
			assetNameRegExp: /wh_jiare.min.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true } },
			canPrint: true
		})
	],

	devServer: {
		contentBase: './public',
    	historyApiFallback: true,
    	inline: false,
    	port: 8089,
    	hot: true,
    	host: "127.0.0.1"
  	}
}
