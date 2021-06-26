import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../firebase/index';
// import { useSelector } from 'react-redux';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  const currentUid = firebase.auth().currentUser.uid;

  const [chatIds, setChatIds] = useState([]);
  const [chatData, setChatData] = useState([]);
  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  useEffect(() => {
    const chatIdsListener = firebase
      .firestore()
      .collection('users')
      .doc(currentUid)
      .onSnapshot(querySnapshot => {
        setChatIds(querySnapshot.data().chats);
      });

    return () => {
      chatIdsListener();
      // chatDataListener;
    };
  }, []);

  useEffect(() => {
    if (chatIds.length > 0) {
      console.log('hi', chatIds);
    }
    firebase
      .firestore()
      .collection('chats')
      // .where('chatId', '==', chatId)
      .get()
      .then(querySnapshot => {
        let queryArr = [];
        querySnapshot.forEach(doc => {
          if (chatIds.includes(doc.id)) {
            let chatObj = {
              id: doc.id,
              data: doc.data()
            };
            queryArr.push(chatObj);
            setChatData(queryArr); //should be outside of this function
            console.log('queryArr', queryArr);
          }
        });

        // if (queryArr.length != 0) {
        // setChatData(queryArr);
        // console.log('queryArr PO', chatData);
        // }
      });
  }, [setChatIds, chatIds]); //?

  const renderChatItem = async chatId => {
    const querySnapshot = await firebase
      .firestore()
      .collection('chats')
      .where('chatId', '==', chatId)
      .get();

    querySnapshot.forEach(doc => {
      if (doc.id === chatId) {
        console.log('rendering chatItem', doc.data());

        return (
          <ChatItem
            key={chatId}
            chatData={doc.data()}
            currentUid={currentUid}
          />
        );
      }
    });
  };
  const renderItem = ({ item }) => (
    <ChatItem key={item.id} chatData={item.data} currentUid={currentUid} />
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {chatData.length > 0 ? (
          <FlatList
            data={chatData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={chatIds}
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
