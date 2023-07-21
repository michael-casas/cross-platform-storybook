//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withExpo } = require('@expo/next-adapter');
const path = require('node:path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  reactStrictMode: false,
  transpilePackages: [
    'expo',
    'react-native',
    'react-native-web',
    'react-native-reanimated',
    'react-native-svg',
    'react-native-gesture-handler',
  ],
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [
      // ["react-native-reanimated-swc-plugin", {}],
      // ["@nissy-dev/swc-plugin-react-native-web", { commonjs: true }],
    ],
  },
  // eslint-disable-next-line no-empty-pattern
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      type: 'asset/resource',
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, '../node_modules/'),
    });
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      // "@expo/vector-icons": "react-native-vector-icons",
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withExpo,
];

module.exports = composePlugins(...plugins)(nextConfig);
