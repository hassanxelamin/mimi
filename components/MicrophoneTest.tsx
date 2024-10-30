import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { requestMicrophonePermission } from '../utils/permissions';
import { getHumeAccessToken } from '../utils/humeAuth';

export default function MicrophoneTest() {
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const checkPermissions = async () => {
    setIsLoading(true);
    try {
      await requestMicrophonePermission();
      setPermissionStatus('Microphone permission granted!');
      
      // Test Hume connection
      const token = await getHumeAccessToken();
      setPermissionStatus('Microphone permission granted and Hume connected!');
    } catch (error: any) {
      setPermissionStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Microphone Test</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={checkPermissions}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          Test Microphone Permission
        </Text>
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {permissionStatus ? (
        <Text style={[
          styles.status,
          permissionStatus.includes('Error') ? styles.error : styles.success
        ]}>
          {permissionStatus}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1a2a6c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#e7f3e8',
    color: '#2d862f',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  loader: {
    marginTop: 20,
  },
}); 