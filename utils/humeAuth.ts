import { fetchAccessToken } from 'hume';
import { requestMicrophonePermission } from './permissions';

export const getHumeAccessToken = async () => {
  try {
    // Request microphone permission first
    await requestMicrophonePermission();
    
    const accessToken = await fetchAccessToken({
      apiKey: String('YmorjEtlfamaIFtQQyxjlLG6tkgHTV7eMlyKjvsABqWUlogE'),
      secretKey: String('QHoSQdnlvmTmASyBKV23GuEQRqJVQAydczaNhovKAdMUlgeHeI0GGHVikYYPNitr'),
    });
    
    if (!accessToken) {
      throw new Error('Failed to get access token');
    }
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Hume access token:', error);
    throw error;
  }
}; 