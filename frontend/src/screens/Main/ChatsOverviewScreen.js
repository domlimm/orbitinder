import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import firebase from '../../firebase/index';

import { ChatItem } from '../../components/index';

const ChatsOverviewScreen = ({ navigation }) => {
  const currentUid = firebase.auth().currentUser.uid;

  const userData = useSelector(state => state.user.userData);
  const [initial, setInitial] = useState(true);
  const [chats, setChats] = useState([]);
  const [chatsLatestMsg, setChatsLatestMsg] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const navigateChat = data => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'Chat',
      params: { userData: data }
    });
  };

  useEffect(() => {
    const usersDataListener = firebase
      .firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          if (doc.id !== currentUid) {
            data.push({ id: doc.id, ...doc.data() });
          }
        });

        setUsersData(data);
      });

    return () => usersDataListener();
  }, []);

  useEffect(() => {
    const chatsListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const latestChats = querySnapshot.data().chats;
        setRefresh(true);
        setChats(latestChats);
      });

    return () => chatsListener();
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      return;
    }

    const latestMsgListener = firebase
      .firestore()
      .collection('chats')
      .where('chatId', 'in', chats)
      .onSnapshot(querySnapshot => {
        if (initial) {
          setInitial(false);
        } else {
          const latestMsgs = querySnapshot.docs.map(doc => doc.data());
          setRefresh(true);
          setChatsLatestMsg(latestMsgs);
        }
      });

    return () => latestMsgListener();
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => {
              // let peer;
              // peer = usersData.filter(data => data.chats.includes(item))[0];
              // let latestChat =
              //   chatsLatestMsg.length > 0
              //     ? chatsLatestMsg.filter(data => data.chatId === item)[0]
              //     : {};

              // if (peer === undefined) {
              firebase
                .firestore()
                .collection('users')
                .where('chats', 'array-contains', item)
                .get()
                .then(querySnapshot => {
                  let data = [];

                  let latestChat =
                    chatsLatestMsg.length > 0
                      ? chatsLatestMsg.filter(data => data.chatId === item)[0]
                      : {};

                  querySnapshot.forEach(doc => {
                    if (doc.id !== currentUid) {
                      data.push({ id: doc.id, ...doc.data() });
                    }
                  });

                  console.log(
                    'undefined',
                    data.filter(user => user.chats.includes(item))[0]
                  );

                  return (
                    <ChatItem
                      key={item}
                      currentUid={userData.id}
                      latestChat={latestChat}
                      chatId={item}
                      peer={data.filter(user => user.chats.includes(item))[0]}
                      onPress={navigateChat}
                    />
                  );
                });
              // }

              // console.log('!undefined', peer);

              // return (
              //   <ChatItem
              //     key={item}
              //     currentUid={userData.id}
              //     latestChat={latestChat}
              //     chatId={item}
              //     peer={peer}
              //     onPress={navigateChat}
              //   />
              // );
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
