const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.base.json')

const esModules = ['lit-element', 'lit-html']

module.exports = {
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, transform: {
    '^.+\\.ts$': 'ts-jest'
  , [`(${concat(esModules)}).+\\.js$`]: 'babel-jest'
  }
, transformIgnorePatterns: [`node_modules/(?!${concatForPnpm(esModules)})`]
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}

function concat(modules) {
  return modules.join('|')
}

function concatForPnpm(modules) {
  return concat(modules.map(x => `(.*${x})`))
}
