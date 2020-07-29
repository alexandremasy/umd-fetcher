const path = require('path')
const cjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

const version = process.env.VERSION || require('./package.json').version
const banner =
  `/*!
  * umd-loader v${version}
  * (c) ${new Date().getFullYear()} Alexandre Masy
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, _path)


module.exports = [
  {
    entry: resolve('src/index.js'),
    file: resolve('dist/umd-loader.esm.min.js'),
    format: 'es',
    env: 'production'
  }
].map(config)

function config(opts){
  const ret = {
    input: opts.entry,
    output: {
      banner,
      format: opts.format,
      file: opts.file,
      name: 'umd-loader'
    },
    plugins: [
      cjs(),
      terser()
    ]
  }

  return ret;
}