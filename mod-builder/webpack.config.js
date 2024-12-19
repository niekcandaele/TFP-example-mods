import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (modPath) => {
  return {
    mode: 'production',
    entry: `./${modPath}/index.js`,
    optimization: {
      minimize: false
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, modPath, "build"),
      filename: "WebMod/bundle.js"
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, modPath, "ModInfo.xml") },
          { from: path.resolve(__dirname, modPath, "assets"), to: "WebMod/", noErrorOnMissing: true },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'WebMod/styling.css',
      })
    ],
    module: {
      rules: [
        {
          test: /\.jpe?g|png$/,
          exclude: /node_modules/,
          use: ["url-loader", "file-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            "presets": [
              "@babel/preset-react",
            ],
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
      ]
    },
  }
};
