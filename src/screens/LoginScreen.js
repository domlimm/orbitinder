import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout, Input } from '@ui-kitten/components';
import { LandingHeader, LandingImage } from '../components/navigation/index';
import AuthHeader from '../components/navigation/BackTopNav';

const LoginScreen = ({ navigation }) => {
  const navigateDetails = () => {
    console.log('btn pressed');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <AuthHeader navigation={navigation} />
      <Layout style={styles.landingImageContainer}>
        <LandingImage imgSrc={require('../assets/images/high-five-pana.png')} />
      </Layout>
      <Layout style={styles.inputContainer}>
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
          placeholder='********'
        />
        <Button
          onPress={() => console.log('Login Btn Pressed')}
          style={styles.loginBtn}
        >
          Log In
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImageContainer: {
    height: '50%'
  },
  inputContainer: {
    height: '50%',
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    marginBottom: 15
  },
  loginBtn: {
    width: '70%',
    marginTop: 10,
    backgroundColor: '#407BFF'
  }
});

export default LoginScreen;
