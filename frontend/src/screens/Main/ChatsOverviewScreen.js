import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import firebase from '../../firebase/index';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);
  const [initial, setInitial] = useState(true);
  const [chatsLatestMsg, setChatsLatestMsg] = useState([]);

  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  useEffect(() => {
    const latestMsgListener = firebase
      .firestore()
      .collection('chats')
      .where('chatId', 'in', userData.chats)
      .onSnapshot(querySnapshot => {
        if (initial) {
          setInitial(false);
        } else {
          const latestMsgs = querySnapshot.docs.map(doc => doc.data());
          setChatsLatestMsg(latestMsgs);
        }
      });

    return () => latestMsgListener();
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {userData.chatsLatestMessage?.length > 0 ? (
          <FlatList
            data={userData.chats}
            renderItem={({ item }) => {
              const peer = usersData.filter(data =>
                data.chats?.includes(item)
              )[0];
              let latestChat =
                chatsLatestMsg.length > 0
                  ? chatsLatestMsg.filter(data => data.chatId === item)[0]
                  : userData.chatsLatestMessage?.filter(
                      data => data.chatId === item
                    )[0];

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
            extraData={userData.chatsLatestMessage}
          />
        ) : (
          <Layout>
            <Text>TODO: Empty Chats</Text>
          </Layout>
        )}
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
