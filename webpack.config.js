let tolo = /\.css$/;
module.exports = {
    mode: 'production',
    entry: { 
      index: '/src/app/Index.js',
      contract: '/src/app/Contract.js',
    },
    output: {
      path: __dirname + '/src/public/js',
      filename: '[name].bundle.js',
      library: 'AudioRecorder',
      libraryTarget: 'var'
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            }
          }
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
      ] 
    }
  }