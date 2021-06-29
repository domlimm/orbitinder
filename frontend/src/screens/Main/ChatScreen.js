import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard, Linking } from 'react-native';
import {
  Layout,
  Divider,
  Text,
  Spinner,
  Modal,
  Card,
  Button
} from '@ui-kitten/components';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../../firebase/index';
import { useDispatch, useSelector } from 'react-redux';
import ConfettiCannon from 'react-native-confetti-cannon';

import * as userActions from '../../redux/actions/user';
import { ChatHeader, Toast } from '../../components/index';

const { width, height } = Dimensions.get('window');

const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const userData = useSelector(state => state.user.userData);

  const [messages, setMessages] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [matched, setMatched] = useState(null);
  const [isMatching, setIsMatching] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('');

  const { peerId, name, imagePath, chatId, peerData } = route.params.userData;

  useEffect(() => {
    const matchingListener = db
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(doc => {
        const uData = { id: currentUser.uid, ...doc.data() };
        setMatched(uData.matched);
        setIsMatching(uData.matching);
        console.log('matched', matched);
        console.log('matching', isMatching);
      });

    return () => matchingListener();
  }, []);

  useEffect(() => {
    const messagesListener = db
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const singleMsg = {
            _id: doc.id,
            text: doc.data().message,
            createdAt: doc.data().timestamp,
            user: {
              _id: doc.data().userId,
              name: doc.data().name
            }
          };

          return singleMsg;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  const onSend = async message => {
    const msg = message[0].text;
    const timestamp = new Date().toISOString();

    const data = {
      messages: {
        timestamp: timestamp,
        message: message[0].text,
        name: currentUser.displayName,
        userId: currentUser.uid
        // image: might have to add image of user sending msg if app scales
      },
      latestMessage: {
        message: msg,
        timestamp: timestamp,
        id: currentUser.uid
      }
    };

    db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(data.messages);

    await db.collection('chats').doc(chatId).set(
      {
        latestMessage: data.latestMessage
      },
      { merge: true }
    );

    dispatch(
      userActions.updateLatestChatMessage(userData, chatId, data.latestMessage)
    );
  };

  const scrollToBottomComponent = () => (
    <Feather name='chevrons-down' size={24} color='#333' />
  );

  const renderSend = props => (
    <Send {...props}>
      <View>
        <MaterialCommunityIcons
          name='send'
          style={styles.sendIcon}
          size={24}
          color='#407BFF'
        />
      </View>
    </Send>
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#407BFF' }
      }}
    />
  );

  const renderChatEmpty = () => (
    <View style={styles.chatEmptyContainer}>
      <Text style={styles.chatEmptyText}>
        <Text style={styles.nameBold}>{name}</Text>
        {' could be your teammate. Start by saying Hi?'}
      </Text>
    </View>
  );

  const renderLoading = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width
      }}
    >
      <Spinner />
    </View>
  );

  const telegramHandler = () => {
    Keyboard.dismiss();

    Linking.openURL(peerData.background.telegram).catch(err => {
      console.log('[ChatScreen] An error occurred opening Telegram', err);
    });
  };

  const handshakeHandler = () => {
    Keyboard.dismiss();
    dispatch(userActions.updateMatching(true));
  };

  const initiateHandler = () => {
    setAlertMessage(`Partnership request has been sent to ${name}!`);
    setShowAlert(true);
    setAlertStatus('success');
    dispatch(userActions.updateMatched(peerId));
  };

  const cancelHandler = () => {
    dispatch(userActions.updateMatching(false));
  };

  const acceptHandler = () => {
    dispatch(userActions.confirmMatched(peerId));
    setVisible(false);
    setConfetti(!confetti);
  };

  const considerHandler = () => {
    dispatch(userActions.reconsiderMatched(peerId));
    setVisible(false);
  };

  const resetConfetti = () => {
    setConfetti(!confetti);
  };

  const navProps = {
    navigation: navigation,
    name: name,
    imagePath: imagePath
  };

  let message, header;

  if (isMatching && matched) {
    // Accepted partnership request, show toast?

    header = 'Partnership Request';
    message = `${name} has sent you a partnership request!\n\nDo you wish to accept or take some more time to consider?\n\nOnce you have accepted ${
      peerData.gender === 'Female' ? 'her' : 'his'
    } Telegram handler will be released to you at the top right of this screen.\n\nIf you were to re-consider, please send ${name} a partnership request using the button at the top right of this screen.`;
  } else if (isMatching && !matched) {
    // Show Toast that partnership request sent.

    header = 'Initiate Handshake';
    message = `Do you wish to pair up with ${name} for Orbital?\n\nDoing so will send a partnership request to ${
      peerData.gender === 'Female' ? 'her' : 'him'
    }.\n\nIf ${
      peerData.gender === 'Female' ? 'she' : 'he'
    } accepts your request, ${
      peerData.gender === 'Female' ? 'her' : 'his'
    } Telegram handler will be released to you at the top right of this screen.`;
  }

  return (
    <Layout style={styles.mainContainer}>
      {confetti ||
        (matched && !isMatching && (
          <ConfettiCannon
            count={160}
            origin={{ x: -10, y: 0 }}
            onAnimationEnd={resetConfetti}
          />
        ))}
      <ChatHeader
        navProps={navProps}
        peerData={peerData}
        initiateAction={userData.matched ? telegramHandler : handshakeHandler}
        userMatched={userData.matched}
      />
      {showAlert && (
        <Toast
          message={alertMessage}
          status={alertStatus}
          hide={show => setShowAlert(show)}
        />
      )}
      <Divider />
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: currentUser.uid,
          name: currentUser.displayName
        }}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
        alwaysShowSend
        renderBubble={renderBubble}
        renderAvatar={null}
        renderChatEmpty={renderChatEmpty}
        renderLoading={renderLoading}
      />
      <Modal
        visible={isMatching || visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={styles.handshakeContainer}>
          <Layout>
            <Text category='h4'>{header}</Text>
            <Text style={styles.handshakeInfo}>{message}</Text>
          </Layout>
          <Layout style={styles.footerContainer}>
            <Button
              onPress={
                !matched && isMatching
                  ? () => {
                      initiateHandler();
                      setVisible(false);
                    }
                  : () => {
                      acceptHandler();
                      setVisible(false);
                    }
              }
              status='success'
              style={[styles.actionBtn, { marginRight: 2 }]}
            >
              {!matched && isMatching ? 'INITIATE' : 'ACCEPT'}
            </Button>
            <Button
              onPress={
                !matched && isMatching
                  ? () => cancelHandler()
                  : () => considerHandler()
              }
              status='danger'
              style={[styles.actionBtn, { marginLeft: 4 }]}
            >
              {!matched && isMatching ? 'CANCEL' : 'RECONSIDER'}
            </Button>
          </Layout>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  sendIcon: {
    marginBottom: 10,
    marginRight: 5
  },
  chatEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleY: -1 }]
  },
  nameBold: {
    fontWeight: 'bold'
  },
  chatEmptyText: {
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  handshakeContainer: {
    width: width * 0.88
  },
  handshakeInfo: {
    marginVertical: 20
  },
  footerContainer: {
    flexDirection: 'row'
  },
  actionBtn: {
    width: '48%'
  }
});

export default ChatScreen;
