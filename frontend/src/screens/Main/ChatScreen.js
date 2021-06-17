import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Layout, Divider, Text } from '@ui-kitten/components';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import * as chatFunctions from '../../firebase/functions/chat';
import { ChatHeader } from '../../components/index';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);

  const { name, imagePath } = route.params.userData;

  useEffect(() => {
    console.log(route.params.userData);

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
    ]);
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  const onSend = message => {
    console.log(message);

    Keyboard.dismiss();

    // chatFunctions.sendMessage()
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
      <Text
        style={styles.chatEmptyText}
      >{`${name} could be your teammate. Start saying Hi?`}</Text>
    </View>
  );

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
          _id: 1 // current user authenticated
        }}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
        alwaysShowSend
        renderBubble={renderBubble}
        renderAvatar={null}
        renderChatEmpty={renderChatEmpty}
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
  chatEmptyText: {
    textAlign: 'center',
    flexWrap: 'wrap'
  }
});

export default ChatScreen;
