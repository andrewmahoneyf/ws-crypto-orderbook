const path = require('path');
/**
 * Allows us to edit create-react-app configuration
 * without ejecting.
 */
const { getLoader, loaderByName } = require('@craco/craco');

const absolutePath = path.join(__dirname, '../common');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      // https://medium.com/frontend-digest/using-create-react-app-in-a-monorepo-a4e6f25be7aa
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader'),
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(absolutePath);
      }
      return {
        ...webpackConfig,
        /**
         * Optionally, other webpack configuration details.
         */
        // optimization: {
        //   splitChunks: {
        //   },
        // },
      };
    },
  },
};
