import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import {
  Layout,
  List,
  ListItem,
  Avatar,
  Divider,
  Text,
  Input
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards
import { TitleHeader } from '../../components/index';

const ResetPasswordScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('UserProfileScreen');
  };
  let navProps = {
    title: 'Change Password',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };
  return (
    <SafeAreaView style={styles.parentContainer}>
      <TitleHeader navProps={navProps} />
      <Input placeholder='Place your Text' label='Current Password' />
      <Input placeholder='Place your Text' label='New Password' />
      <Input placeholder='Place your Text' label='Confirm New Password' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain'
  },
  layoutContainerTop: {
    height: '50%'
  },
  layoutContainerBottom: {
    height: '50%',
    alignItems: 'center'
  },
  textContent: {
    textAlign: 'center',
    fontSize: 17
  },
  signUpBtn: {
    width: '70%',
    marginVertical: 15
  },
  logInBtn: {
    width: '70%'
  },
  scrollView: {
    // backgroundColor: '#fafafa'
  }
});

export default ResetPasswordScreen;
