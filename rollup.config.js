import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'

const UMD_NAME = 'KISS'

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]

function createOptions({ directory, target }) {
  const commonPlugins = [
    replace({
      'Object.defineProperty(exports, "__esModule", { value: true });': ''
    , delimiters: ['\n', '\n']
    })
  , resolve({ browser: true })
  , commonjs()
  , json()
  , typescript({ target })
  ]

  return [
    {
      input: 'src/index.ts'
    , output: createSingleEntryOutput('index')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/index.ts'
    , output: createSingleEntryMinification('index')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  , ...createComponentOutput('combo-box')
  , ...createComponentOutput('dropdown-list')
  , ...createComponentOutput('list-box')
  ]

  function createComponentOutput(name) {
    return [
      {
        input: `src/components/${name}.ts`
      , output: createMultiEntryOutput('components')
      , plugins: [
          ...commonPlugins
        , analyze({ summaryOnly: true })
        ]
      }
    , {
        input: `src/components/${name}.ts`
      , output: createMultiEntryMinification('components')
      , plugins: [
          ...commonPlugins
        , terser()
        ]
      }
    , {
        input: `src/define/${name}.ts`
      , output: createMultiEntryOutput('define')
      , plugins: [
          ...commonPlugins
        , analyze({ summaryOnly: true })
        ]
      }
    , {
        input: `src/define/${name}.ts`
      , output: createMultiEntryMinification('define')
      , plugins: [
          ...commonPlugins
        , terser()
        ]
      }
    ]
  }

  function createSingleEntryOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createSingleEntryMinification(name) {
    return [
      {
        file: `dist/${directory}/${name}.min.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.min.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createMultiEntryOutput(name) {
    return [
      {
        dir: `dist/${directory}/es/${name}`
      , format: 'es'
      , sourcemap: true
      , manualChunks: {
          'chunk': ['lit-element', 'lit-html', 'userstyle']
        }
      }
    , {
        file: `dist/${directory}/umd/${name}.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createMultiEntryMinification(name) {
    return [
      {
        dir: `dist/${directory}/es/${name}-min`
      , format: 'es'
      , sourcemap: true
      , manualChunks: {
          'chunk': ['lit-element', 'lit-html', 'userstyle']
        }
      }
    , {
        file: `dist/${directory}/umd/${name}.min.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }
}
