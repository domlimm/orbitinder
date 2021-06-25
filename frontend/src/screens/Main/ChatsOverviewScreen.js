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

    return () => chatIdsListener();
  }, []);

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

    // .then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     if (doc.id === item) {
    //       console.log('rendering chatItem', doc.data());

    //       return (
    //         <ChatItem
    //           key={item}
    //           chatData={doc.data()}
    //           currentUid={currentUid}
    //         />
    //       );
    //     }
    //   });
    // });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {chatIds.length > 0 ? (
          <FlatList
            data={chatIds}
            renderItem={({ item }) => {
              firebase
                .firestore()
                .collection('chats')
                .where('chatId', '==', chatId)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if (doc.id === item) {
                      console.log('rendering chatItem', doc.data());

                      return (
                        <ChatItem
                          key={item}
                          chatData={doc.data()}
                          currentUid={currentUid}
                        />
                      );
                    }
                  });
                });

              //renderChatItem(item)
            }}
            keyExtractor={item => item}
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
