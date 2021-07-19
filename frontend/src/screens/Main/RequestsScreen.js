import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import firebase from '../../firebase/';

import { RequestItem, Toast } from '../../components/';

const RequestsScreen = () => {
  const usersData = useSelector(state => state.users.usersData);
  const userData = useSelector(state => state.user.userData);

  const [allRequests, setAllRequests] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [typeIndex, setTypeIndex] = useState(0);
  const flatListRef = useRef();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('');

  const TYPES = ['ALL', 'ACTIVE', 'SENT'];

  const TypeList = () => {
    let selectedStyle;

    if (typeIndex === 0) {
      selectedStyle = styles.typeTextAll;
    } else if (typeIndex === 1) {
      selectedStyle = styles.typeTextActive;
    } else if (typeIndex === 2) {
      selectedStyle = styles.typeTextSent;
    }

    return (
      <Layout style={styles.typeContainer}>
        {TYPES.map((item, index) => {
          let tab;

          if (index === 0) {
            tab = `${item} (${allRequests.length})`;
          } else if (index === 1) {
            tab = `${item} (${activeRequests.length})`;
          } else if (index === 2) {
            tab = `${item} (${sentRequests.length})`;
          }

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                setTypeIndex(index);
                flatListRef.current.scrollToOffset({
                  animated: true,
                  offset: 0
                });
              }}
            >
              <Text
                style={[
                  styles.typeText,
                  typeIndex === index && styles.typeTextSelected,
                  typeIndex === index && selectedStyle
                ]}
                category='h6'
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Layout>
    );
  };

  useEffect(() => {
    const latestReqsListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const likedBy = querySnapshot
          .data()
          .likedBy.map(id => ({ id: id, type: 'active' }));
        const likes = querySnapshot
          .data()
          .likes.map(id => ({ id: id, type: 'sent' }));
        const userRequests = [...likedBy, ...likes];

        setActiveRequests(likedBy);
        setSentRequests(likes);
        setAllRequests(userRequests);
      });

    return () => latestReqsListener();
  }, []);

  const cancelToastHandler = name => {
    setAlertMessage(`Successfully cancelled your sent request to ${name}!`);
    setShowAlert(true);
    setAlertStatus('success');
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      {showAlert && (
        <Toast
          message={alertMessage}
          status={alertStatus}
          hide={show => setShowAlert(show)}
        />
      )}
      <Layout style={styles.chatsContainer}>
        <TypeList />
        {allRequests?.length > 0 ? (
          <FlatList
            style={styles.requestContainer}
            data={
              typeIndex === 0
                ? allRequests
                : typeIndex === 1
                ? activeRequests
                : sentRequests
            }
            renderItem={({ item }) => {
              const senderData = usersData.filter(
                data => data.id === item.id
              )[0];

              return (
                <RequestItem
                  receiverData={userData}
                  senderData={senderData}
                  type={item.type}
                  index={typeIndex}
                  cancelToastHandler={name => cancelToastHandler(name)}
                />
              );
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            extraData={allRequests}
            scrollEventThrottle={16}
            bounces={false}
            ref={flatListRef}
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
    paddingBottom: 20
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
  },
  typeContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around'
  },
  typeText: {
    color: 'grey',
    fontWeight: 'bold'
  },
  typeTextSelected: {
    paddingBottom: 5,
    borderBottomWidth: 2
  },
  typeTextAll: {
    color: '#407BFF',
    borderColor: '#407BFF'
  },
  typeTextActive: {
    color: '#71D624',
    borderColor: '#71D624'
  },
  typeTextSent: {
    color: '#FFB73A',
    borderColor: '#FFB73A'
  }
});

export default RequestsScreen;
