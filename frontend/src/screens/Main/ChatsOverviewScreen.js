import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../firebase/index';
import { useSelector } from 'react-redux';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  const userData = useSelector(state => state.user.userData);
  const db = firebase.firestore();
  const currentUid = firebase.auth().currentUser.uid;

  const [chatIds, setChatIds] = useState([]);
  const [chatsData, setChatsData] = useState([]);
  const [latestChatsMessage, setLatestChatsMessage] = useState([]);

  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  useEffect(() => {
    const chatIdsListener = db
      .collection('users')
      .doc(currentUid)
      .onSnapshot(querySnapshot => {
        setChatIds(querySnapshot.data().chats);
      });

    return () => chatIdsListener();
  }, []);

  useEffect(() => {
    const chatDataListener = db
      .collection('chats')
      .onSnapshot(querySnapshot => {
        let queryArr = [];

        querySnapshot.forEach(doc => {
          if (chatIds.includes(doc.id)) {
            queryArr.push(doc.data());
          }
        });

        setChatsData(queryArr);
      });

    return () => chatDataListener();
  }, [setChatIds, chatIds]);

  useEffect(() => {
    const latestMsgsListener = db
      .collection('chats')
      .onSnapshot(querySnapshot => {
        let queryArr = [];

        querySnapshot.forEach(doc => {
          if (chatIds.length > 0 && chatIds.includes(doc.id)) {
            queryArr.push({
              id: doc.id,
              latestMessage: doc.data().latestMessage
            });
          } else {
            if (userData.chats.includes(doc.id)) {
              queryArr.push({
                id: doc.id,
                latestMessage: doc.data().latestMessage
              });
            } else {
              if (
                doc.data().participants.filter(user => user.id === currentUid)
                  .length > 0
              ) {
                queryArr.push({
                  id: doc.id,
                  latestMessage: doc.data().latestMessage
                });
              }
            }
          }
        });

        setLatestChatsMessage(queryArr);
      });

    return () => latestMsgsListener();
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {chatsData.length > 0 ? (
          <FlatList
            data={chatsData}
            renderItem={({ item }) => (
              <ChatItem
                key={item.chatId}
                chatData={item}
                currentUid={currentUid}
                latestChat={
                  latestChatsMessage.length > 0
                    ? latestChatsMessage.filter(
                        msg => msg.id === item.chatId
                      )[0]
                    : {}
                }
                onPress={navigateChat}
              />
            )}
            keyExtractor={item => item.chatId}
            extraData={latestChatsMessage}
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
