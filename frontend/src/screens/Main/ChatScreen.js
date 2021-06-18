import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Divider, Text, Spinner } from '@ui-kitten/components';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../../firebase/index';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../redux/actions/user';
import { ChatHeader } from '../../components/index';

const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const userData = useSelector(state => state.user.userData);

  const [messages, setMessages] = useState([]);

  const { name, imagePath, chatId } = route.params.userData;

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

  const renderLoading = () => <Spinner style={{ flex: 1 }} />;

  const navProps = {
    navigation: navigation,
    name: name,
    imagePath: imagePath
  };

  return (
    <Layout style={styles.mainContainer}>
      <ChatHeader navProps={navProps} />
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
  }
});

export default ChatScreen;
