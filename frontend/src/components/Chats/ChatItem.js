import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';

import UserAvatar from '../UserProfile/UserAvatar';

const ChatItem = ({ currentUid, peer, chatId, onPress, latestChat }) => {
  const { message, timestamp, userId } = latestChat?.latestMessage;

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        onPress({
          chatId: chatId,
          id: peer.id,
          name: peer.name,
          imagePath: peer.imagePath
        })
      }
    >
      <Layout style={styles.avatarContainer}>
        {peer.imagePath.length > 0 ? (
          <Image source={{ uri: peer.imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={peer.name} size={50} fontSize={22} />
        )}
      </Layout>
      <Layout style={styles.detailsContainer}>
        <Layout style={styles.topChatContainer}>
          <Layout style={styles.nameContainer}>
            <Text category='h6' style={styles.name}>
              {peer.name}
            </Text>
          </Layout>
          <Layout style={styles.timeContainer}>
            <Text>{dayjs(timestamp).format('h:mm A')}</Text>
          </Layout>
        </Layout>
        <Layout style={styles.bottomChatContainer}>
          <Text numberOfLines={1}>
            {currentUid === userId ? `You: ${message}` : message}
          </Text>
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
