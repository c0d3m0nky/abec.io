const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const __assets = '../assets/'

module.exports = {
    entry: './roundTracker.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'roundTracker.js',
        path: path.resolve(__assets, 'dist'),
    },
    devServer: {
        static: path.join(__assets, "dist"),
        compress: true,
        port: 4000,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './node_modules/jquery/dist/',
                    to: path.join(__assets, "dist/")
                }
            ]
        })
    ]
};