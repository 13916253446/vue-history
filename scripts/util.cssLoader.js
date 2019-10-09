
module.exports = ({ env = process.env.NODE_ENV, isExtract = process.env.NODE_ENV === 'production', lessBase = '', stylusBase = '', sassBase = '', scssBase = '', postcssConfig = '' } = {}) => {
  const sourceMap = true

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap
    }
  }
  postcssLoader.options = Object.assign(postcssLoader.options, (postcssConfig ? { config: { path: postcssConfig } } : {}))

  const sassLoader = [{ loader: 'sass-loader', options: { indentedSyntax: true, sourceMap } }]
  const scssLoader = [{ loader: 'sass-loader', options: { sourceMap } }]

  if (sassBase) sassLoader.push({ loader: 'sass-resources-loader', options: { resources: [sassBase] } })
  if (scssBase) scssLoader.push({ loader: 'sass-resources-loader', options: { resources: [scssBase] } })

  const files = [
    { test: /\.css$/ },
    { test: /\.p(ost)?css$/ },
    { test: /\.less$/, loaders: [{ loader: 'less-loader', options: lessBase ? { globalVars: lessBase, sourceMap } : { sourceMap } }] },
    { test: /\.styl(us)?$/, loaders: [{ loader: 'stylus-loader', options: stylusBase ? { import: stylusBase, sourceMap } : { sourceMap } }] },
    { test: /\.sass$/, loaders: sassLoader },
    { test: /\.scss$/, loaders: scssLoader }
  ]

  const MiniCssExtractPlugin = isExtract ? require('mini-css-extract-plugin') : {}
  return files.map(({ test, loaders = [] }) => {
    const result = {
      test,
      use: [
        isExtract ? MiniCssExtractPlugin.loader : { loader: 'vue-style-loader', options: { sourceMap } },
        cssLoader,
        postcssLoader
      ]
    }
    result.use = result.use.concat(loaders)
    return result
  })
}
