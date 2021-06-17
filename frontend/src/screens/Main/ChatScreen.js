import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { ChatHeader } from '../../components/index';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);

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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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

  const navProps = {
    navigation: navigation,
    name: route.params.userData.name,
    imagePath: route.params.userData.imagePath
  };

  return (
    <Layout style={styles.mainContainer}>
      <ChatHeader navProps={navProps} />
      <Divider />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
        alwaysShowSend
        renderBubble={renderBubble}
        renderAvatar={null}
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
  }
});

export default ChatScreen;
