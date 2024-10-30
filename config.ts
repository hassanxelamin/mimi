import Constants from 'expo-constants';

const ENV = {
  HUME_API_KEY: Constants.expoConfig?.extra?.humeApiKey ?? '',
  HUME_SECRET_KEY: Constants.expoConfig?.extra?.humeSecretKey ?? '',
};

export default ENV; 