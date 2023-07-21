import type { StorybookConfig } from '@storybook/nextjs';
import fs from 'node:fs';
import path from 'node:path';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: [
    {
      from: '../assets',
      to: '/assets',
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: 'libs/ui/next.config.js',
      builder: {
        useSWC: true,
      },
    },
  },
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: [
          '@shopify/react-native-skia',
          'expo',
          'react-native',
          'react-native-web',
          'react-native-reanimated',
          'react-native-redash',
          'react-native-svg',
          'react-native-gesture-handler',
        ],
        modulesToAlias: {
          'react-native$': 'react-native-web',
        },
        babelPugins: [
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ],
      },
    },
  ],
  previewHead: (head) => `
  ${head}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/canvaskit-wasm/0.38.2/canvaskit.js" integrity="sha512-nxNoFynWFNZm8ox2kHj2aS/ieYfLNh8CbtDj0kIYwpjPZZj6XTWQ5i8jteTwHqBp+8GAlP/+p0i3zmMVTnrLuQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
      (async function () {
        window.CanvasKit = await CanvasKitInit();
      })();
    </script>
    <style type="text/css">
      @font-face {
        font-family: "WorkSans";
        src: url("/assets/fonts/WorkSans.ttf") format("truetype");
      }
    </style>
`,
  webpackFinal(config, options) {
    config.module?.rules?.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      type: 'asset/resource',
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    config.plugins?.push(
      new (class CopySkiaPlugin {
        apply(compiler: webpack.Compiler) {
          compiler.hooks.thisCompilation.tap('AddSkiaPlugin', (compilation) => {
            compilation.hooks.processAssets.tapPromise(
              {
                name: 'copy-skia',
                stage:
                  compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
              },
              async () => {
                const src = require.resolve(
                  'canvaskit-wasm/bin/full/canvaskit.wasm'
                );
                if (compilation.getAsset(src)) {
                  return;
                }

                compilation.emitAsset(
                  '/canvaskit.wasm',
                  new webpack.sources.RawSource(await fs.promises.readFile(src))
                );
              }
            );
          });
        }
      })(),
      new NodePolyfillPlugin()
    );
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
      },
      extensions: [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.ts',
        '.tsx',
        '...',
      ],
    };
    return config;
  },
};

export default config;
