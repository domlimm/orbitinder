import React from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform
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

  const saveBackgroundHandler = () => {
    const userData = {
      ...route.params,
      background: {
        ...route.params.background,
        technologyExperience
      },
      updatedAt: new Date().toISOString(),
      likes: [],
      dislikes: [],
      chats: [],
      likedBy: []
    };

    try {
      dispatch(
        userActions.addProfile(userData, route.params.imagePath.length > 0)
      );

      setError(null);
      setLoading(true);

      navigation.navigate('PreferencesLanding');
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
          <ExperienceSelectInputs getSelections={getSelections} />
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
