import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input, Icon, Text } from '@ui-kitten/components';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
// To separate for local imports rather than installed dependencies: add below onwards
import {
  LandingImage,
  NavHeader,
  LoadingIndicator
} from '../../components/index';
import { LOG_IN } from '../../graphql/queries';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const [logIn, { data, error, loading }] = useMutation(LOG_IN);

  const logInHandler = () => {
    logIn({ variables: { email: email, password: password } });
  };

  React.useEffect(() => {
    if (error) {
      Alert.alert('Invalid Credentials!');
    }
  }, [error]);

  if (data) {
    AsyncStorage.setItem('token', data.logIn.token).then(() => {
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'MainNavigator' }]
      //   })
      // );
      navigation.navigate('MainNavigator');
    });
  }

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
    <SafeAreaView style={styles.parentContainer}>
      <KeyboardAvoidingView>
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
