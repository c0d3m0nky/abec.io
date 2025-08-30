const path = require('path');
const fsExtra = require('fs-extra');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const __dist = path.resolve('./assets/dist');

fsExtra.emptydirSync(__dist);

module.exports = {
    entry: {
        roundTracker: './wsrc/roundTracker.ts',
        geo: './wsrc/geo.ts',
    },
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
        filename: '[name].js',
        path: __dist,
    },
    devServer: {
        static: __dist,
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
                    from: './wsrc/css/',
                    to: path.join(__dist, 'css/')
                },
                {
                    from: './wsrc/js/',
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