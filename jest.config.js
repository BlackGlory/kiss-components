const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.base.json')

const esModules = ['lit-element', 'lit-html'].join('|');

module.exports = {
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, transform: {
    '^.+\\.ts$': 'ts-jest'
  , [`(${esModules}).+\\.js$`]: 'babel-jest'
  }
, transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
