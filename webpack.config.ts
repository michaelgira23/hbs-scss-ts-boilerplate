// import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as fs from 'fs';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import { getPages, pagesPath } from './pages';

interface EntryMap {
	[name: string]: string;
}

const pages = getPages();
const htmlWebpackPlugins: HtmlWebpackPlugin[] = [];

const entries: EntryMap = pages.reduce((map, page) => {
	console.log('entry', map, page);
	const tsPath = path.join(pagesPath, page, `${page}.ts`);
	if (fs.existsSync(tsPath)) {
		map[page] = tsPath;
		htmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				chunks: [page],
				filename: `${page}.html`
			})
		);
	}
	return map;
}, {} as EntryMap);

console.log('entries', entries);

const config: webpack.Configuration = {
	mode: 'development',
	entry: entries,
	output: {
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ejs$/,
				loader: 'ejs-html-loader',
				include: [
					path.join(__dirname, 'src')
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	plugins: [
		// new webpack.ProvidePlugin({
		// 	_: 'lodash'
		// }),
		// new CleanWebpackPlugin(['dist']),
		new webpack.HashedModuleIdsPlugin(),
		// new HtmlWebpackPlugin({
		// 	// template: '!!ejs-html-loader!index.ejs'
		// 	title: 'testies'
		// })
		...htmlWebpackPlugins
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
