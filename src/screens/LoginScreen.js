import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout, Input } from '@ui-kitten/components';
import LandingHeader from '../components/navigation/LandingHeader';
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
        <Image
          style={styles.landingImage}
          source={require('../assets/images/login-image.png')}
        />
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
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain'
  },
  inputContainer: {
    height: '50%',
    alignItems: 'center'
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

export default LoginScreen;
