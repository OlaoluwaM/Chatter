const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' }, modules: isTest ? 'cjs' : false },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-async-to-generator',
  ],
};
