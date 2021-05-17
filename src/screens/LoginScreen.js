import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { Button, Layout, Input } from '@ui-kitten/components';
import LandingHeader from '../components/LandingHeader';
import AuthHeader from '../components/backTopNav';

export const LoginScreen = ({ navigation }) => {
  const navigateDetails = () => {
    console.log('btn pressed');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AuthHeader navigation={navigation} />
      <Layout style={{ height: '50%' }}>
        <Image
          style={styles.landingImage}
          source={require('../assets/images/login-image.png')}
        />
      </Layout>
      <Layout style={{ height: '50%', alignItems: 'center' }}>
        <Input
          label='Email'
          style={styles.textInput}
          placeholder='example@mail.com'
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
        />
        <Input
          label='Password'
          style={styles.textInput}
          placeholder='*******'
        />
        <Button
          onPress={() => console.log('Login Btn Pressed')}
          style={styles.loginBtn}
        >
          Log In
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    paddingTop: 20
  },
  textInput: {
    width: '70%',
    marginBottom: 20
  },
  loginBtn: {
    width: '70%',
    marginTop: 10,
    backgroundColor: '#407BFF'
  }
});
