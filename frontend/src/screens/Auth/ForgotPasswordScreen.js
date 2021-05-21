import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Button, Layout, Input, Text } from '@ui-kitten/components';

import { LandingImage, NavHeader } from '../../components/index';

const ForgotPasswordScreen = ({ navigation }) => {
  const [value, setValue] = React.useState('');

  const EmailIcon = props => <Icon {...props} name='email-outline' />;

  const navigateDetails = () => {
    navigation.navigate('ForgotPasswordConfirmation');
  };

  const navProps = {
    navigation: navigation,
    type: 'auth',
    backNav: true
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <KeyboardAvoidingView style={styles.formContainer}>
        <NavHeader navProps={navProps} />
        <ScrollView>
          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/forgot-password-img.png')}
            />
          </Layout>
          <Layout style={styles.textContainer}>
            <Text style={styles.textTitle}>Forgot password?</Text>
            <Text style={styles.textCaption}>
              {'Enter the email address\nassociated with your account.'}
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Input
              label='Email'
              style={styles.textInput}
              placeholder='example@mail.com'
              value={value}
              onChangeText={nextValue => setValue(nextValue)}
              accessoryRight={EmailIcon}
            />
            <Button onPress={navigateDetails} style={styles.sendBtn}>
              Send
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
  formContainer: {
    flex: 1
  },
  landingImageContainer: {
    height: Dimensions.get('window').height / 3 + 50
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    marginBottom: 10
  },
  sendBtn: {
    width: '70%',
    marginTop: 10,
    marginBottom: 30
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 20
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
