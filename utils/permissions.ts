import { Audio } from 'expo-av';
import * as Device from 'expo-device';

export async function requestMicrophonePermission() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Audio.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Audio.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      throw new Error('Permission to access microphone was denied');
    }
    
    return true;
  }
  return false;
} 