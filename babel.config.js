module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '^@assets/(.+)': './assets/\\1',
        },
      },
    ],
  ],
  env: {
    development: {
      plugins: ['babel-plugin-styled-components'],
    },
  },
};
