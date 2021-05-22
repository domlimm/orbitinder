import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

const BioInput = ({ userData, sendDataToParent }) => {
  const [bio, setBio] = React.useState(userData);
  // console.log(status);
  // if (status == false) {
  //   setBio(userData.bio);
  //   // console.log(bio);
  // }
  const changeTextHandler = input => {
    // the callback. Use a better name
    setBio(input);
    sendDataToParent(bio);
  };
  console.log('child rendering');
  return (
    <Input
      style={styles.bioInput}
      multiline={true}
      textStyle={styles.bioText}
      placeholder='Bio'
      label='Provide a short bio about yourself'
      onChangeText={input => changeTextHandler(input)}
      numberOfLines={6}
      value={bio}
    />
  );
};

const styles = StyleSheet.create({
  bioText: {
    // minHeight: '40%',
    maxHeight: 150,
    textAlignVertical: 'top'
  },
  bioInput: {
    width: '80%',
    marginVertical: 20
  }
});

export default BioInput;
