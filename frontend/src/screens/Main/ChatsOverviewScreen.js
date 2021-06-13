import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards

const ChatsOverviewScreen = ({ navigation }) => {
  const navigateChat = () => {
    navigation.navigate('ChatStackNavigator', { screen: 'Chat' });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <Layout style={styles.chatsContainer}>
          <Text>Chats Overview Screen</Text>
          <Button style={{ marginVertical: 20 }} onPress={navigateChat}>
            To Chat
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  chatsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChatsOverviewScreen;
