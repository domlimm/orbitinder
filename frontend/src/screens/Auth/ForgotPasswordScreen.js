import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input, Text } from '@ui-kitten/components';

import { LandingImage, AuthHeader } from '../../components/navigation/index';

const ForgotPasswordScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('ForgotPasswordConfirmationScreen');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <AuthHeader navigation={navigation} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView>
          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/forgot-password-img.png')}
            />
          </Layout>
          <Layout style={styles.textContainer}>
            <Text style={styles.textTitle}>Forgot your password?</Text>
            <Text style={styles.textCaption}>
              {'Enter your registered email to \nreceive further instructions'}
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Input
              label='Email'
              style={styles.textInput}
              placeholder='example@mail.com'
              value={value}
              onChangeText={nextValue => setValue(nextValue)}
            />
            <Button onPress={navigateDetails} style={styles.loginBtn}>
              Send Email
            </Button>
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center'
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

export default ForgotPasswordScreen;
