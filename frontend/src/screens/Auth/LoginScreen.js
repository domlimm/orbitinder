import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input, Icon, Text } from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { LandingImage, AuthHeader } from '../../components/index';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const EmailIcon = props => <Icon {...props} name='email-outline' />;
  const PasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showPasswordHandler}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

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
            />
            <Input
              label='Password'
              style={styles.textInput}
              placeholder='********'
              accessoryRight={PasswordIcon}
              value={password}
              onChangeText={input => setPassword(input)}
              accessoryRight={PasswordIcon}
              secureTextEntry={showPassword}
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
