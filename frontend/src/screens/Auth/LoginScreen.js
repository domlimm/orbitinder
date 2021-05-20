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
// To separate for local imports rather than installed dependencies: add below onwards
import {
  LandingHeader,
  LandingImage,
  AuthHeader
} from '../../components/navigation/index';

const LoginScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('MainNavigator');
  };

  const navigatePasswordScreen = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <KeyboardAvoidingView>
        <ScrollView>
          <AuthHeader navigation={navigation} />

          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/high-five-pana.png')}
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
            <Button onPress={navigateDetails} style={styles.loginBtn}>
              Log In
            </Button>
            <Text
              style={styles.forgotPassText}
              onPress={navigatePasswordScreen}
            >
              Forgot Password?
            </Text>
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
  forgotPassText: {
    marginVertical: 20,
    color: '#407BFF'
  }
});

export default LoginScreen;
