const { withNxMetro } = require("@nx/expo");
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  defaultConfig.resolver.resolverMainFields.unshift("sbmodern");
  defaultConfig.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );
  defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  defaultConfig.resolver.sourceExts.push("svg");
  defaultConfig.resolver.resolveRequest = function (
    context,
    realModuleName,
    platform
  ) {
    if (
      realModuleName === "@storybook/react" &&
      context.endsWith(".stories.tsx")
    ) {
      return require.resolve("@storybook/react-native", { paths: [context] });
    }
    return null;
  };
  return withNxMetro(defaultConfig, {
    // Change this to true to see debugging info.
    // Useful if you have issues resolving modules
    debug: false,
    // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
    extensions: [],
    // the project root to start the metro server
    projectRoot: __dirname,
    // Specify any additional (to projectRoot) watch folders, this is used to know which files to watch
    watchFolders: [],
  });
})();
