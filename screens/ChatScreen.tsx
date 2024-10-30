import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import VoiceChat from '../components/VoiceChat';
import { getHumeAccessToken } from '../utils/humeAuth';

const ChatScreen = () => {
  const [accessToken, setAccessToken] = useState<string | null>('YmorjEtlfamaIFtQQyxjlLG6tkgHTV7eMlyKjvsABqWUlogE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeHume = async () => {
      try {
        const token = await getHumeAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error('Failed to initialize Hume:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeHume();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!accessToken) {
    return null;
  }

  return <VoiceChat accessToken={accessToken} />;
};

export default ChatScreen; 