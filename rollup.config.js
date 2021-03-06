import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'index.js',
  output: {
    file: 'dist/router.js',
    format: 'umd',
    name: 'MedusaRouter',
  },
  plugins: [
    babel({ exclude: '**/node_modules/**' }),
    commonjs(),
    uglify()
  ]
}
