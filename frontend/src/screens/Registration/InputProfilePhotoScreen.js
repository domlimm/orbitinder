import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Icon, Text } from '@ui-kitten/components';
import { StackActions } from '@react-navigation/native';

import {
  LandingImage,
  NavHeader,
  LoadingIndicator
} from '../../components/index';

const InputProfilePhotoScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('');

  const skipHandler = () => {
    navigation.navigate('ProfileLanding');
  };

  const navProps = {
    navigation: navigation,
    type: 'landing',
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
              imgSrc={require('../../assets/images/input-profile-photo.png')}
            />
          </Layout>
          <Layout style={styles.inputContainer}>
            <Button
              accessoryLeft={loading ? () => <LoadingIndicator /> : null}
              style={styles.photoBtn}
              disabled={loading}
            >
              Add a Photo
            </Button>
            <Text style={styles.skipText} onPress={skipHandler}>
              Skip
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
    height: Dimensions.get('window').height / 2
  },
  inputContainer: {
    height: '50%',
    alignItems: 'center'
  },
  photoBtn: {
    width: '70%',
    marginTop: 10
  },
  skipText: {
    marginVertical: 20,
    color: '#407BFF'
  }
});

export default InputProfilePhotoScreen;
