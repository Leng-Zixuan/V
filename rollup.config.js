import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'packages/v/src/index.ts',
    output: [
      {
        sourcemap: true,
        file: './packages/v/dist/v.js',
        format: 'iife',
        name: 'V'
      }
    ],
    plugins: [
      typescript({ sourceMap: true }),
      resolve(),
      commonjs(),
    ]
  }
]