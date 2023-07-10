const path = require('path');
const fsExtra = require('fs-extra');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const __dist = path.resolve('../assets/dist');

fsExtra.emptydirSync(__dist);

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
        path: path.resolve('../assets/dist'),
    },
    devServer: {
        static: path.resolve('../assets/dist'),
        compress: true,
        port: 4000,
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 compress: {
    //                     drop_console: false,
    //                 },
    //                 mangle: false,
    //             }
    //         })
    //     ]
    // },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './node_modules/jquery/dist/jquery.js',
                    to: path.join(__dist, 'jquery.js')
                },
                {
                    from: './css/',
                    to: path.join(__dist, 'css/')
                },
                {
                    from: './js/',
                    to: __dist,
                    globOptions: {
                        ignore: [
                            // '**/theme.js'
                        ]
                    }
                }
            ]
        })
    ]
};