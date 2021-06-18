import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);

  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        <FlatList
          data={userData.chats}
          renderItem={({ item }) => {
            const peer = usersData.filter(data =>
              data.chats?.includes(item)
            )[0];
            let latestChat = {};

            if (userData.chatslatestMessage.length > 0) {
              latestChat = userData.chatslatestMessage.filter(
                data => data.chatId === item
              )[0];
            }

            return (
              <ChatItem
                key={peer.id}
                currentUid={userData.id}
                latestChat={latestChat}
                chatId={item}
                peer={peer}
                onPress={navigateChat}
              />
            );
          }}
          keyExtractor={item => item}
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
