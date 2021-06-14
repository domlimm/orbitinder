import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';

import { ChatHeader } from '../../components/index';

const ChatScreen = ({ navigation, route }) => {
  const navProps = {
    navigation: navigation,
    name: route.params.data.name,
    imagePath: route.params.data.imagePath
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView>
        <ChatHeader navProps={navProps} />
        <Layout>
          <Text>This will be the 1 to 1 chat screen.</Text>
        </Layout>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kbContainer: {
    flex: 1
  }
});

export default ChatScreen;
