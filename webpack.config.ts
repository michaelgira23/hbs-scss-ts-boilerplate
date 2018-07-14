// import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as fs from 'fs';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import { getPages, pagesPath } from './pages';

interface EntryMap {
	[name: string]: string;
}

const pages = getPages();
const htmlWebpackPlugins: HtmlWebpackPlugin[] = [];

const entries: EntryMap = pages.reduce((map, page) => {
	const pagePath = path.join(pagesPath, page);

	const entryPath = path.join(pagePath, 'entry.ts');
	const ejsPath = path.join(pagePath, `${page}.ejs`);
	const tsPath = path.join(pagePath, `${page}.ts`);

	if (fs.existsSync(ejsPath)) {
		map[page] = entryPath;
		htmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				filename: `${page}.html`,
				// template: `!!ejs-html-loader!${ejsPath}`,
				template: ejsPath
				// inject: false
			})
		);
	}
	return map;
}, {} as EntryMap);

const config: webpack.Configuration = {
	mode: 'development',
	entry: entries,
	output: {
		filename: 'js/[name].[chunkhash].js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ejs$/,
				loader: 'ejs-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin(['dist/*']),
		new webpack.HashedModuleIdsPlugin(),
		...htmlWebpackPlugins,
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash].css',
			chunkFilename: 'css/[id].[chunkhash].css'
		})
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor'
		// }),
	]
	// optimization: {
	// 	runtimeChunk: 'single',
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	}
	// }
};

export default ((_: any, argv: any) => {
	if (argv.mode === 'development') {
		config.devtool = 'inline-source-map';
	}
	return config;
}) as webpack.Configuration;
