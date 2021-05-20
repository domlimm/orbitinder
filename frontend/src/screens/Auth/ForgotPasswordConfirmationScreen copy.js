import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Input,
  Text,
  StyleService
} from '@ui-kitten/components';
import { LandingImage } from '../../components/navigation/index';
import AuthHeader from '../../components/navigation/AuthHeader';

const ForgotPasswordConfirmationScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <AuthHeader navigation={navigation} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView>
          <Layout style={styles.landingImageContainer}>
            <LandingImage
              imgSrc={require('../../assets/images/email-img.png')}
            />
          </Layout>
          <Layout style={styles.textContainer}>
            <Text style={styles.textTitle}>Email has been send</Text>
            <Text style={styles.textCaption}>{'Please check your inbox'}</Text>
          </Layout>
          <Layout style={styles.inputContainer}>
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
