import 'dotenv/config';

export default {
  expo: {
    name: 'mimi',
    slug: 'mimi-voice-assistant',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      // You might want to add a bundle identifier for iOS as well
      // bundleIdentifier: "com.yourcompany.yourappname"
      "bundleIdentifier": "com.ios.app"
    },
    android: {
      package: "com.droid.app"
    },
    extra: {
      humeApiKey: process.env.HUME_API_KEY,
      humeSecretKey: process.env.HUME_SECRET_KEY,
    },
  }
}; 