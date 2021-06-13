import React from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  // Temporary
  const users = useSelector(state => state.users.userData);

  const navigateChat = () => {
    navigation.navigate('ChatStackNavigator', { screen: 'Chat' });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ChatItem name={item.name} imagePath={item.imagePath} />
          )}
          keyExtractor={item => item.id}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  chatsContainer: {
    flex: 1
  }
});

export default ChatsOverviewScreen;
