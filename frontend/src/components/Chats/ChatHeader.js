import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
  Avatar
} from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

import UserAvatar from '../UserProfile/UserAvatar';

const ChatHeader = ({ navProps, peerData, initiateAction, userMatched }) => {
  const BackIcon = props => (
    <Icon
      {...props}
      name='arrow-back'
      fill='#407bff'
      style={[props.style, { width: 32, height: 32 }]}
    />
  );

  const HandshakeIcon = () => (
    <FontAwesome name='handshake-o' size={28} color='#407bff' />
  );

  const TelegramIcon = () => (
    <FontAwesome name='telegram' size={30} color='#407bff' />
  );

  const navigateBack = () => {
    navProps.navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const TelegramAction = () => (
    <TopNavigationAction icon={TelegramIcon} onPress={initiateAction} />
  );

  const HandshakeAction = () => (
    <TopNavigationAction icon={HandshakeIcon} onPress={initiateAction} />
  );

  const renderTitle = peerData => {
    const navigateProfile = () => {
      navProps.navigation.navigate('ChatStackNavigator', {
        screen: 'UserProfile',
        params: { profileData: peerData }
      });
    };

    return (
      <Pressable style={styles.titleContainer} onPress={navigateProfile}>
        {navProps.imagePath.length > 0 ? (
          <Avatar
            style={styles.profilePhoto}
            source={{ uri: navProps.imagePath }}
          />
        ) : (
          <UserAvatar
            style={styles.profilePhoto}
            name={navProps.name}
            size={40}
            fontSize={18}
          />
        )}
        <Text style={styles.titleHeader}>{navProps.name}</Text>
      </Pressable>
    );
  };

  return (
    <TopNavigation
      accessoryLeft={BackAction}
      accessoryRight={userMatched ? TelegramAction : HandshakeAction}
      style={styles.topNav}
      title={() => renderTitle(peerData)}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePhoto: {
    marginRight: 8
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default ChatHeader;
