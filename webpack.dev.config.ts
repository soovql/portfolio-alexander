import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
    devtool: "inline-source-map",
    // @ts-ignore
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true
    },
};

export default config;
