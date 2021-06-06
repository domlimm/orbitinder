import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input, Icon, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import {
  LandingImage,
  NavHeader,
  LoadingIndicator,
  Toast
} from '../../components/index';
import * as authActions from '../../redux/actions/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('');

  const dispatch = useDispatch();

  const logInHandler = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        setAlertMessage('You have empty fields!');
        setShowAlert(true);
        setAlertStatus('warning');
        return;
      }

      setLoading(true);

      await dispatch(authActions.logIn(email, password));
    } catch (err) {
      setAlertMessage(err.message);
      setShowAlert(true);
      setAlertStatus('danger');
      setLoading(false);
    }
  };

  const EmailIcon = props => <Icon {...props} name='email-outline' />;
  const PasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showPasswordHandler}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const navigatePasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const navProps = {
    navigation: navigation,
    type: 'auth',
    backNav: true
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView style={styles.parentContainer}>
        <NavHeader navProps={navProps} />
        {showAlert && (
          <Toast
            message={alertMessage}
            status={alertStatus}
            hide={show => setShowAlert(show)}
          />
        )}
        <ScrollView>
          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/login-image.png')}
            />
          </Layout>
          <Layout style={styles.inputContainer}>
            <Input
              label='Email'
              style={styles.textInput}
              placeholder='example@mail.com'
              value={email}
              onChangeText={input => setEmail(input)}
              accessoryRight={EmailIcon}
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              label='Password'
              style={styles.textInput}
              placeholder='********'
              accessoryRight={PasswordIcon}
              value={password}
              onChangeText={input => setPassword(input)}
              secureTextEntry={showPassword}
              autoCapitalize='none'
            />
            <Button
              onPress={logInHandler}
              accessoryLeft={loading ? () => <LoadingIndicator /> : null}
              style={styles.loginBtn}
              disabled={loading}
            >
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
    height: Dimensions.get('window').height / 3 + 50
  },
  inputContainer: {
    height: '50%',
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    marginVertical: 10
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
