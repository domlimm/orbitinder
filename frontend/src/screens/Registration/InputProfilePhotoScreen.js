import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Icon, Text } from '@ui-kitten/components';

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

  const CameraIcon = props => <Icon {...props} name='camera-outline' />;

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
              imgSrc={require('../../assets/images/login-image.png')}
            />
          </Layout>
          <Layout style={styles.inputContainer}>
            <Button
              accessoryLeft={
                loading ? () => <LoadingIndicator /> : <CameraIcon />
              }
              style={styles.loginBtn}
              disabled={loading}
            >
              Add a Photo
            </Button>
            <Text style={styles.forgotPassText}>Skip</Text>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default InputProfilePhotoScreen;
