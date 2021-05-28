import React from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
// To separate for local imports rather than installed dependencies: add below onwards
import {
  InputBackgroundSelect,
  NavHeader,
  LoadingIndicator
} from '../../components/index';
import * as userActions from '../../redux/actions/user';
import * as authActions from '../../redux/actions/auth';

const InputBackgroundScreen3 = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [technologyExperience, setTechnologyExperience] = React.useState({
    game: [],
    web: [],
    mobile: [],
    database: [],
    machineLearning: []
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const getSelections = React.useCallback(data => {
    setTechnologyExperience(prevData => ({ ...prevData, ...data }));
  }, []);

  // Current state, useState is async.
  // console.log('parent.getSelections', technologyExperience);

  // React.useEffect(() => {
  //   console.log('parent.useEffect.getSelections', technologyExperience);
  // }, [technologyExperience]);

  React.useEffect(() => {
    console.log('3', route.params);
  }, []);

  const saveBackgroundHandler = () => {
    const userData = {
      ...route.params,
      background: {
        ...route.params.background,
        technologyExperience
      }
    };

    try {
      Promise.all([
        SecureStore.getItemAsync('email'),
        SecureStore.getItemAsync('password')
      ])
        .then(([email, password]) => {
          Promise.all([
            SecureStore.deleteItemAsync('email'),
            SecureStore.deleteItemAsync('password')
          ])
            .then(() => {
              dispatch(authActions.signUp(email, password, route.params.name));
              dispatch(userActions.addProfile(userData));

              setError(null);
              setLoading(true);

              navigation.navigate('PreferencesLanding');
            })
            .catch(err => {
              setError('Error deleting account data', err);
              setLoading(false);
            });
        })
        .catch(err => {
          setError('Error retrieving account data', err);
          setLoading(false);
        });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const navProps = {
    navigation: navigation,
    backNav: true,
    type: 'register'
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView style={styles.container}>
        <NavHeader navProps={navProps} />
        <ScrollView>
          <Layout style={styles.textContainer}>
            <Text style={styles.screenTitle}>Technology Experience</Text>
            <Text style={styles.screenCaption}>
              Let others know what you're great at!
            </Text>
          </Layout>
          <InputBackgroundSelect getSelections={getSelections} />
          <Layout style={styles.btnContainer}>
            <Button
              onPress={saveBackgroundHandler}
              style={styles.signupBtn}
              accessoryLeft={loading ? () => <LoadingIndicator /> : null}
              disabled={loading}
            >
              {loading ? 'Adding' : 'Add Background'}
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
