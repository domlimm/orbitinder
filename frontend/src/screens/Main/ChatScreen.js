import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';

import { TitleHeader } from '../../components/index';

const ChatScreen = () => {
  const navProps = {
    title: "User's Name",
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView>
        <TitleHeader navProps={navProps} />
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
