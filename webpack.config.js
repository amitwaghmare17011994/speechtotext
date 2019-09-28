module.exports = {
    entry: './src/SpeechToText.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
              babelrc: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
          }
      },
      {
          test: /\.css$/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  
              },
              {
                  loader: 'postcss-loader',
                  options: {
                      plugins: [require('autoprefixer')()],
                    
                  }
              }
          ]
      },
      {
        test: /\.(woff(2)?|ttf|jpe?g|png|gif|svg|ico)$/i,
        use: [
            {
                loader: 'file-loader',
                 
            }
        ]
    }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'SpeechToText.js'
    },
    devServer: {
      contentBase: './dist'
    }
  };