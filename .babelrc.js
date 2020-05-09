module.exports = api => {
  const isTest = api.cache(() => String(process.env.NODE_ENV) === 'test');

  return {
    presets: [
      [
        '@babel/preset-env',
        { targets: { node: 'current' }, modules: isTest ? 'commonjs' : false },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      'syntax-dynamic-import',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  };
};
