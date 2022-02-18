import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import {
  ExperienceSelectInputs,
  NavHeader,
  LoadingIndicator
} from '../../components/index';
import * as userActions from '../../redux/actions/user';
import * as authActions from '../../redux/actions/auth';

const PrefInputScreen2 = ({ route, navigation }) => {
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

  const savePreferencesHandler = () => {
    const preferences = {
      preferences: {
        ...route.params,
        technologyExperience
      }
    };

    try {
      dispatch(userActions.addPreferences(preferences));
      // new user registers => call model to train on new set of data => save model in heroku
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      fetch(
        'https://orbitinder-recommend.herokuapp.com/train_model',
        requestOptions
      )
        .then(r => r.toString())
        .then(data => {
          // console.log(data);
        });
      setError(null);
      setLoading(true);

      dispatch(authActions.completeRegister(false));
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
            <Text style={styles.screenTitle}>Partner Preferences</Text>
            <Text style={styles.screenCaption}>
              {'Which technologies should your \npartner have experience in?'}
            </Text>
          </Layout>
          <ExperienceSelectInputs getSelections={getSelections} />
          <Layout style={styles.btnContainer}>
            <Button
              onPress={savePreferencesHandler}
              style={styles.signupBtn}
              accessoryLeft={loading ? () => <LoadingIndicator /> : null}
              disabled={loading}
            >
              {loading ? 'Saving' : 'Save Preferences'}
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

export default PrefInputScreen2;
