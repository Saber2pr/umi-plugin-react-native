import { IApi } from 'umi';
import path from 'path';

export default (api: IApi) => {
  api.describe({
    key: 'reactNative',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.chainWebpack((config) => {
    config.resolve.extensions.add('.android.js').add('.ios.js').add('.web.js');
    return config;
  });

  api.modifyConfig(memo => {
    return {
      ...memo,
      define: {
        ...memo.define,
        __DEV__: process.env.NODE_ENV === 'development',
      },
      alias: {
        ...memo.alias,
        // Directly match react-native to react-native-web.
        'react-native': path.resolve(__dirname,'react-native-web'),
        // Alias react-native-svg to svgs
        'react-native-svg': 'svgs',
        // Alias react-native-linear-gradient
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
        // Alias core react-native internals to react-native-web equivalents
        'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/vendor/emitter/EventSubscriptionVendor$':
        'react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      },
    };
  });
};
