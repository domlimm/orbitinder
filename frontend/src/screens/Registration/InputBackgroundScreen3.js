import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { InputBackgroundSelect, NavHeader } from '../../components/index';

const InputBackgroundScreen3 = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('PreferencesLanding');
  };

  let navProps = {
    navigation: navigation,
    backNav: true,
    type: 'register'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <NavHeader navProps={navProps} />
        <Layout style={styles.textContainer}>
          <Text style={styles.screenTitle}>Technology Experience</Text>
          <Text style={styles.screenCaption}>
            Let others know what you're great at!
          </Text>
        </Layout>
        <InputBackgroundSelect />
        <Layout style={styles.btnContainer}>
          <Button onPress={navigateDetails} style={styles.signupBtn}>
            Next
          </Button>
        </Layout>
      </ScrollView>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    marginVertical: 5,
    alignItems: 'center'
  },
  textInput: {
    width: '70%'
  },
  signupBtn: {
    width: '70%',
    marginVertical: 30,
    backgroundColor: '#407BFF'
  },
  selectInput: {
    width: '70%',
    marginVertical: 10
  },
  screenTitle: {
    color: '#407BFF',
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%'
  },
  screenCaption: {
    color: '#8cb0ff',
    fontSize: 12,
    fontWeight: 'bold',
    width: '70%'
  }
});

export default InputBackgroundScreen3;