import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import UserAvatar from '../UserProfile/UserAvatar';

const ChatItem = ({ chatData, currentUid, latestChat, onPress }) => {
  const { id, name, imagePath } = chatData.participants.filter(
    user => user.id !== currentUid
  )[0];
  const peerData = useSelector(
    state => state.users.usersData.filter(user => user.id === id)[0]
  );
  let message = '',
    timestamp = '',
    latestId = '';

  if (latestChat.latestMessage !== undefined) {
    message = latestChat.latestMessage.message;
    timestamp = latestChat.latestMessage.timestamp;
    latestId = latestChat.latestMessage.id;
  }

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        onPress({
          peerId: peerData.id,
          name: name,
          imagePath: imagePath,
          chatId: chatData.chatId,
          peerData: peerData
        })
      }
    >
      <Layout style={styles.avatarContainer}>
        {imagePath.length > 0 ? (
          <Image source={{ uri: imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={name} size={50} fontSize={22} />
        )}
      </Layout>
      <Layout style={styles.detailsContainer}>
        <Layout style={styles.topChatContainer}>
          <Layout style={styles.nameContainer}>
            <Text category='h6' style={styles.name}>
              {name}
            </Text>
          </Layout>
          <Layout style={styles.timeContainer}>
            {timestamp.length > 0 && (
              <Text>{dayjs(timestamp).format('h:mm A')}</Text>
            )}
          </Layout>
        </Layout>
        <Layout style={styles.bottomChatContainer}>
          {message.length > 0 ? (
            <Text numberOfLines={1}>
              {currentUid === latestId ? `You: ${message}` : message}
            </Text>
          ) : (
            <Text>Click on here to start a conversation!</Text>
          )}
        </Layout>
      </Layout>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8
  },
  avatarContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  detailsContainer: {
    flex: 0.76,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8
  },
  nameContainer: {
    flex: 0.7
  },
  name: {
    fontWeight: 'bold'
  },
  timeContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  topChatContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default ChatItem;
