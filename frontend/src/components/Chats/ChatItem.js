import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import UserAvatar from '../UserProfile/UserAvatar';

const ChatItem = ({ id, name, imagePath, onPress }) => {
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => onPress({ id: id, name: name, imagePath: imagePath })}
    >
      <Layout style={styles.avatarContainer}>
        {imagePath.length > 0 ? (
          <Image source={{ uri: imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={name} size={50} fontSize={22} />
        )}
      </Layout>
      <Layout style={styles.detailsContainer}>
        <Layout style={styles.nameContainer}>
          <Text category='h6' style={styles.name}>
            {name}
          </Text>
        </Layout>
        <Layout style={styles.timeContainer}>
          <Text>12:00 AM</Text>
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
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
    justifyContent: 'flex-end'
  }
});

export default ChatItem;
