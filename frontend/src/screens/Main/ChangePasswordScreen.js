import React from 'react';
import {
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from 'react-native';
import { Layout, Input, Icon, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TitleHeader, LoadingIndicator, Toast } from '../../components/index';
import firebase from '../../firebase';

const { height } = Dimensions.get('window');

const ChangePasswordScreen = ({ navigation }) => {
  const navProps = {
    title: 'Change Password',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };

  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('');

  const updatePWHandler = async () => {
    try {
      if (
        newPassword !== confirmPassword ||
        newPassword.length === 0 ||
        confirmPassword.length === 0
      ) {
        setAlertMessage('Passwords do not match!');
        setShowAlert(true);
        setAlertStatus('warning');
        return;
      }

      setLoading(true);

      await firebase.auth().currentUser.updatePassword(confirmPassword);

      setLoading(false);
      setAlertMessage('Your password has been changed!');
      setShowAlert(true);
      setAlertStatus('success');
    } catch (err) {
      setLoading(false);
      setAlertMessage(err.message);
      setShowAlert(true);
      setAlertStatus('danger');
    }
  };

  const [newPassword, setNewPassword] = React.useState('');
  const [showNewPassword, setShowNewPassword] = React.useState(true);

  const NewPasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showNewPasswordHandler}>
      <Icon {...props} name={showNewPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showNewPasswordHandler = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

  const ConfirmPasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showConfirmPasswordHandler}>
      <Icon {...props} name={showConfirmPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView style={styles.parentContainer}>
        <TitleHeader navProps={navProps} />
        {showAlert && (
          <Toast
            message={alertMessage}
            status={alertStatus}
            hide={show => setShowAlert(show)}
          />
        )}
        <ScrollView>
          <Layout style={styles.inputContainer}>
            <Input
              label='New Password'
              style={styles.textInput}
              placeholder='********'
              accessoryRight={NewPasswordIcon}
              value={newPassword}
              onChangeText={input => setNewPassword(input)}
              accessoryRight={NewPasswordIcon}
              secureTextEntry={showNewPassword}
            />
            <Input
              label='Confirm New Password'
              style={styles.textInput}
              placeholder='********'
              accessoryRight={ConfirmPasswordIcon}
              value={confirmPassword}
              onChangeText={input => setConfirmPassword(input)}
              accessoryRight={ConfirmPasswordIcon}
              secureTextEntry={showConfirmPassword}
            />
          </Layout>
          <Layout style={styles.btnContainer}>
            <Button
              onPress={updatePWHandler}
              accessoryLeft={loading ? () => <LoadingIndicator /> : null}
              style={styles.changePWBtn}
              disabled={loading}
            >
              Change Password
            </Button>
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
  textInput: {
    width: '70%',
    marginVertical: 10
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.02
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  changePWBtn: {
    width: '70%',
    marginTop: 10
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalText: {
    marginVertical: 20
  }
});

export default ChangePasswordScreen;
