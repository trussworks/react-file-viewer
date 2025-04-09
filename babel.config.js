module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-class-static-block',
    '@babel/plugin-transform-modules-commonjs',
  ],
}
