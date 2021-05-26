import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input, Icon, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import {
  LandingImage,
  NavHeader,
  LoadingIndicator
} from '../../components/index';
import * as authActions from '../../redux/actions/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const logInHandler = async () => {
    try {
      dispatch(authActions.logIn(email, password));
      // await AsyncStorage.removeItem('name');

      setError(null);
      setLoading(true);

      navigation.dispatch(state => {
        console.log('logIn', state);

        return {
          ...StackActions.popToTop(),
          ...StackActions.replace('DrawerNavigator')
        };
        // CommonActions.reset({
        //   index: 0,
        //   routes: [{ name: 'DrawerNavigator' }]
        // });
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // if (data) {
  //   AsyncStorage.setItem('token', data.logIn.token).then(() => {
  //     navigation.dispatch(
  //       CommonActions.reset({ index: 0, routes: [{ name: 'MainNavigator' }] })
  //     );
  //   });
  // }

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
