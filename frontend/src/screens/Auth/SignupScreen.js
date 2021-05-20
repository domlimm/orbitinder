import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  Text
} from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { AuthHeader } from '../../components/index';

const SignupScreen = ({ navigation }) => {
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const genderData = ['Male', 'Female'];
  const genderValue = genderData[selectedIndex.row];
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const navigateDetails = () => {
    navigation.navigate('ProfileLanding');
  };

  const NameIcon = props => <Icon {...props} name='smiling-face-outline' />;
  const EmailIcon = props => <Icon {...props} name='email-outline' />;
  const PasswordIcon = props => (
    <TouchableWithoutFeedback onPress={showPasswordHandler}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const Title = ({ title }) => (
    <Layout style={styles.titleContainer}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </Layout>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer}>
        <AuthHeader navigation={navigation} />
        <ScrollView>
          <Layout style={styles.inputContainer}>
            <Title title='Personal Details' />
            <Input
              label='First Name'
              style={styles.textInput}
              placeholder='John'
              accessoryRight={NameIcon}
            />
            <Input
              label='Last Name'
              style={styles.textInput}
              placeholder='Doe'
              accessoryRight={NameIcon}
            />
            <Select
              style={styles.selectInput}
              selectedIndex={selectedIndex}
              value={genderValue}
              onSelect={index => setSelectedIndex(index)}
              label='Gender'
            >
              {genderData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Title title='Account' />
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
          </Layout>
          <Layout style={styles.btnContainer}>
            <Button onPress={navigateDetails} style={styles.signupBtn}>
              Sign Up
            </Button>
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  formContainer: {
    flex: 1
  },
  titleContainer: {
    width: '70%',
    marginTop: 10
  },
  title: {
    color: '#407BFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  textInput: {
    width: '70%',
    marginVertical: 10
  },
  signupBtn: {
    width: '70%',
    marginVertical: 30
  },
  selectInput: {
    width: '70%',
    marginVertical: 10
  },
  screenTitle: {
    color: '#407BFF',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default SignupScreen;
