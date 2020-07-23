const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  testMatch: ['<rootDir>/app/__tests__/**/*.test.[j]s?(x)'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/file.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  verbose: true,
};
