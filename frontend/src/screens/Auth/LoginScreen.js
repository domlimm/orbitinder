import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Input } from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { LandingImage, AuthHeader } from '../../components/index';

const LoginScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('MainNavigator');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <AuthHeader navigation={navigation} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView>
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
  }
});

export default LoginScreen;
