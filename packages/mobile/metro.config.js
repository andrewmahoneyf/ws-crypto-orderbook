/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const {
  applyConfigForLinkedDependencies,
} = require('@carimus/metro-symlinked-deps');

module.exports = applyConfigForLinkedDependencies(
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    watchFolders: [path.resolve(__dirname, '../../node_modules')],
  },
  {
    projectRoot: __dirname,
    additionalWatchFolders: ['../../node_modules'],
    resolveNodeModulesAtRoot: true,
  },
);
