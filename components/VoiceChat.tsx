import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { VoiceProvider, useVoice, VoiceReadyState } from '@humeai/voice-react';

const Controls = () => {
  const { connect, disconnect, readyState } = useVoice();

  return (
    <View style={styles.controlsContainer}>
      {readyState === VoiceReadyState.OPEN ? (
        <TouchableOpacity 
          style={[styles.button, styles.endButton]}
          onPress={disconnect}
        >
          <Text style={styles.buttonText}>End Session</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.button, styles.startButton]}
          onPress={() => {
            connect()
              .then(() => console.log('Connection successful'))
              .catch((error) => console.error('Connection failed:', error));
          }}
        >
          <Text style={styles.buttonText}>Start Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Messages = () => {
  const { messages } = useVoice();

  return (
    <View style={styles.messagesContainer}>
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <View 
              key={`${msg.type}-${index}`}
              style={[
                styles.messageBox,
                msg.type === "user_message" ? styles.userMessage : styles.assistantMessage
              ]}
            >
              <Text style={styles.messageRole}>{msg.message.role}</Text>
              <Text style={styles.messageContent}>{msg.message.content}</Text>
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

const VoiceChat = ({ accessToken }: { accessToken: string }) => {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <View style={styles.container}>
        <Messages />
        <Controls />
      </View>
    </VoiceProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageBox: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  userMessage: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  messageRole: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 16,
  },
  controlsContainer: {
    padding: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  endButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VoiceChat;
