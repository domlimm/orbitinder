import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Text
} from '@ui-kitten/components';
import { BackTopNav } from '../components/navigation/index';

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
      <BackTopNav navigation={navigation} />
      <Layout style={styles.inputContainer}>
        {/* <Text style={styles.screenTitle}>Sign Up</Text> */}
        <Input label='First Name' style={styles.textInput} placeholder='John' />
        <Input label='Last Name' style={styles.textInput} placeholder='Doe' />

        <Select
          style={styles.selectInput}
          selectedIndex={selectedIndex}
          value={displayValue}
          onSelect={index => setSelectedIndex(index)}
          label='Gender'
        >
          <SelectItem title='Female' />
          <SelectItem title='Male' />
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
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    marginVertical: 30,
    backgroundColor: '#407BFF'
  },
  selectInput: {
    width: '70%'
  },
  screenTitle: {
    color: '#407BFF',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default SignupScreen;
