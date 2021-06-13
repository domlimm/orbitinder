import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import UserAvatar from '../UserProfile/UserAvatar';

const ChatItem = ({ name, imagePath }) => {
  const pressHandler = () => {
    console.log('pressed', name);
  };

  return (
    <Pressable style={styles.cardContainer} onPress={pressHandler}>
      <Layout style={styles.avatarContainer}>
        {imagePath.length > 0 ? (
          <Image source={{ uri: imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={name} size={50} fontSize={22} />
        )}
      </Layout>
      <Layout style={styles.detailsContainer}>
        <Text category='h6' style={styles.name}>
          {name}
        </Text>
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
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ChatItem;
