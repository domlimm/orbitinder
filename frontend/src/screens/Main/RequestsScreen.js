import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import firebase from '../../firebase/index';

import { RequestItem } from '../../components/index';

const RequestsScreen = () => {
  const usersData = useSelector(state => state.users.usersData);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const latestReqsListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const userRequests = querySnapshot.data().likedBy;
        setRequests(userRequests);
      });

    return () => latestReqsListener();
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        {requests?.length > 0 ? (
          <FlatList
            style={styles.requestContainer}
            data={requests}
            renderItem={({ item }) => {
              const senderData = usersData.filter(data => data.id === item)[0];

              return (
                <RequestItem
                  receiverId={senderData.id}
                  userData={senderData}
                  name={senderData.name}
                  imagePath={senderData.imagePath}
                  year={senderData.background.year}
                  degree={senderData.background.degree}
                  biography={senderData.background.biography}
                />
              );
            }}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            extraData={requests}
          />
        ) : (
          <Layout style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {`Sorry, we can't find any requests.\nAnyone could send you one when the time is right!`}
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
    flex: 1,
    paddingVertical: 5
  },
  requestContainer: {
    flex: 1,
    width: '100%'
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

export default RequestsScreen;
