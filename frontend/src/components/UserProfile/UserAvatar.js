import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserAvatar = props => {
  const initials = props.name;
  const size = props.size;
  const initialsSize = props.fontSize;

  // Randomise Colour:
  // '#' + ((Math.random() * (1 << 24)) | 0).toString(16)

  return (
    <View
      style={[
        styles.avatar,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: '#1AC9C8' //lightseagreen //1AC9C8
        },
        props.style
      ]}
    >
      <Text style={[styles.initials, { fontSize: initialsSize }]}>
        {initials && initials.match(/\b(\w)/g).join('')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold'
  }
});

export default UserAvatar;
