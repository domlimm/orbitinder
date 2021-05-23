import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';

import { LandingImage, NavHeader } from '../../components/index';

const ForgotPasswordConfirmationScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  const [value, setValue] = React.useState('');

  const navProps = {
    navigation: navigation,
    type: 'auth',
    backNav: false
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView style={styles.parentContainer}>
        <NavHeader navProps={navProps} />
        <ScrollView>
          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/email-img.png')}
            />
          </Layout>
          <Layout style={styles.textContainer}>
            <Text style={styles.textTitle}>An email has been sent!</Text>
            <Text style={styles.textCaption}>
              {'Please check your inbox for more details.'}
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Button onPress={navigateDetails} style={styles.loginBtn}>
              Log In
            </Button>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kbContainer: {
    flex: 1
  },
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImageContainer: {
    height: Dimensions.get('window').height / 2
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
    marginTop: 10
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 100
  },
  textTitle: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10
  },
  textCaption: {
    fontSize: 15,
    color: 'rgba(64,123,255, 0.8)',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default ForgotPasswordConfirmationScreen;
