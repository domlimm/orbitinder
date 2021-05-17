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
import AuthHeader from '../components/navigation/BackTopNav';

const SignupScreen = ({ navigation }) => {
  const navigateDetails = () => {
    console.log('btn pressed');
  };

  const [value, setValue] = React.useState('');

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const genderData = ['Male', 'Female'];
  const displayValue = genderData[selectedIndex.row];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AuthHeader navigation={navigation} />
      <Layout
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
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
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
        />
        <Input
          label='Password'
          style={styles.textInput}
          placeholder='********'
        />
      </Layout>
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <Button
          onPress={() => console.log('Signup Btn Pressed')}
          style={styles.signupBtn}
        >
          Sign Up
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    paddingTop: 20
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
