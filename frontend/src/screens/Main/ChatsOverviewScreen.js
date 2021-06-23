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
  const [chats, setChats] = useState([]);
  const [chatsLatestMsg, setChatsLatestMsg] = useState([]);

  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  useEffect(() => {
    if (userData.chats.length === 0) {
      return;
    }

    const chatsListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        if (initial) {
          setChats(userData.chats);
          setInitial(false);
        } else {
          const latestChats = querySnapshot.data().chats;
          setChats(latestChats);
        }
      });

    return () => chatsListener();
  }, []);

  useEffect(() => {
    if (userData.chats.length === 0) {
      return;
    }

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
            data={chats}
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
            extraData={chats}
          />
        ) : (
          <Layout style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {`Sorry, we can't find any chats.\nHead to the Team Up screen to get started!`}
            </Text>
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ChatsOverviewScreen;
