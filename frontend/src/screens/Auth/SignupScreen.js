import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Input,
  Select,
  SelectItem,
  IndexPath
} from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { AuthHeader } from '../../components/navigation/index';

const SignupScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('ProfileLanding');
  };

  const [emailValue, setValue] = React.useState('');

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const genderData = ['Male', 'Female'];
  const displayValue = genderData[selectedIndex.row];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer}>
        <ScrollView>
          <AuthHeader navigation={navigation} />
          <Layout style={styles.inputContainer}>
            <Input
              label='First Name'
              style={styles.textInput}
              placeholder='John'
            />
            <Input
              label='Last Name'
              style={styles.textInput}
              placeholder='Doe'
            />

            <Select
              style={styles.selectInput}
              selectedIndex={selectedIndex}
              value={displayValue}
              onSelect={index => setSelectedIndex(index)}
              label='Gender'
            >
              {genderData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Input
              label='Email'
              style={styles.textInput}
              placeholder='example@mail.com'
              value={emailValue}
              onChangeText={nextValue => setValue(nextValue)}
            />
            <Input
              label='Password'
              style={styles.textInput}
              placeholder='********'
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
    marginBottom: 20
  },
  signupBtn: {
    width: '70%',
    marginVertical: 30
  },
  selectInput: {
    width: '70%'
  },
  screenTitle: {
    color: '#407BFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  forgotPassText: {
    marginVertical: 20,
    color: '#407BFF'
  }
});

export default SignupScreen;
