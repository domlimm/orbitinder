import React from 'react';
import {
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {
  Layout,
  List,
  ListItem,
  Text,
  Input,
  Icon,
  Button,
  Modal,
  Card
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards
import { TitleHeader } from '../../components/index';

const ResetPasswordScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('UserProfileScreen');
  };
  let navProps = {
    title: 'Change Password',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };

  const [currentPassword, setcurrentPassword] = React.useState('');
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(true);

  const CurrentPasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showPasswordHandler}>
      <Icon {...props} name={showCurrentPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showPasswordHandler = () => {
    setShowCurrentPassword(!showCurrentPassword);
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

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <KeyboardAvoidingView>
        <TitleHeader navProps={navProps} />
        <ScrollView>
          <Layout style={styles.contentContainer}>
            <Layout style={styles.inputContainer}>
              <Input
                label='Current Password'
                style={styles.textInput}
                placeholder='********'
                accessoryRight={CurrentPasswordIcon}
                value={currentPassword}
                onChangeText={input => setcurrentPassword(input)}
                accessoryRight={CurrentPasswordIcon}
                secureTextEntry={showCurrentPassword}
              />
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
                style={styles.btnInput}
                onPress={() => setModalVisible(true)}
              >
                Change Password
              </Button>
            </Layout>
            <Modal
              visible={modalVisible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setModalVisible(false)}
            >
              <Card disabled={true}>
                <Text style={styles.modalText}>Password Changed</Text>
                <Button size='small' onPress={() => setModalVisible(false)}>
                  DISMISS
                </Button>
              </Card>
            </Modal>
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  textInput: {
    width: '70%',
    marginVertical: 25
  },
  inputContainer: {
    // marginVertical: 30,
    alignItems: 'center',
    flex: 1
    // height: '100%'
  },
  btnContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 110,
    marginBottom: 20
    // height: '30%'
  },
  btnInput: {
    width: '70%'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalText: {
    marginVertical: 20
  },
  contentContainer: {
    margin: 20
  }
});

export default ResetPasswordScreen;
