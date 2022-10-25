let tolo = /\.css$/;
module.exports = {
    mode: 'production',
    entry: { 
      index: '/src/app/index.js',
      //shome: '/src/app/home.js',
      voter: '/src/app/voter.js',
      middleschool: '/src/app/middleschool.js',
      highschool: '/src/app/highschool.js',
    },
    output: {
      path: __dirname + '/src/public/js',
      filename: '[name].bundle.js',
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