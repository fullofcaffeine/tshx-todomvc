const path = require('path');

// I don't know how useful this is and if it is even related to the PWA manifests, but I'll leave it for now
// it's used in the page.ejs view
const ManifestPlugin = require('webpack-manifest-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const cssnano = require('cssnano');

// https://codeburst.io/progressive-web-app-with-webpack-198b073f6c74
// TODO Remember to set PUBLIC_PATH once I know the final domain name for this app
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

//https://stackoverflow.com/questions/54675587/babel-typescript-doesnt-throw-errors-while-webpack-build
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = require('./src/ts/server/config');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

// Easily exclude node modules in Webpack
const nodeExternals = require('webpack-node-externals');

const PUBLIC_PATH = "https://foo.bar"

const plugins = [
  new ManifestPlugin(),
  new SWPrecacheWebpackPlugin(
    {
      cacheId: 'my-domain-cache-id',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: PUBLIC_PATH,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }
  ),
  new WebpackPwaManifest({
    name: 'FullStack sample app',
    short_name: 'Fullstack sample app',
    description: 'Nice one!',
    background_color: '#01579b',
    inject: false,
    filename: 'pwa-manifest.json',
    theme_color: '#01579b',
    'theme-color': '#01579b',
    start_url: '/',
    icons: [
      {
        src: path.join(__dirname, 'assets', 'images', 'logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons')
      }
    ]
  }),
  new ForkTsCheckerWebpackPlugin(
    // See: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/71#issuecomment-345929292
    //{async: false} 
  )
];

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//plugins.push(new BundleAnalyzerPlugin());

if (!config.IS_PRODUCTION) {
  plugins.push(new OpenBrowserPlugin({ url: `http://localhost:${config.SERVER_PORT}` }));
}

module.exports = function(env, argv) {
  const base = {
    mode: config.IS_PRODUCTION ? 'production' : 'development',
    devtool: config.IS_PRODUCTION ? '' : 'eval-source-map',
//    entry: ['@babel/polyfill', './src/ts/client/client'],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: ['babel-loader'],
          exclude: [/node_modules/, nodeModulesPath],
        },
        {
          test: /\.sass$/,
          use: [
            { loader: "style-loader" },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: !config.IS_PRODUCTION,
              },
            },
            { loader: "sass-loader" },
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: !config.IS_PRODUCTION,
              },
            },
/*            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !config.IS_PRODUCTION,
                plugins: config.IS_PRODUCTION ? [] : [cssnano()],
              },
            },*/
          ],
        },
        {
          test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
          use: 'url-loader?limit=10000',
        },
      ],
    },
    plugins
    /*  externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    */
  };

  if (env.platform == 'server') {
    base.target = 'node';
    base.externals = [nodeExternals()];
    base.output = {
      filename: 'server.js',
      // path needs to be an ABSOLUTE file path
      path: path.resolve(process.cwd(), 'dist', 'server-root', 'server'),
      publicPath: '/',
    }, 
    base.entry = ['@babel/polyfill','./src/ts/server/hx.js']
  };

  if (env.platform == 'web') {
    base.entry = ['@babel/polyfill', './src/ts/client/client'];
    base.output = {
      path: path.join(__dirname, 'dist', 'statics'),
      filename: `[name]-[hash:8]-bundle.js`,
      publicPath: '/statics/',
    }
    base.devServer = {
      port: config.WEBPACK_PORT,
    }
  };

  return base;
}
