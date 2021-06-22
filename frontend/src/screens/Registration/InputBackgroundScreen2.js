import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Text
} from '@ui-kitten/components';

import { NavHeader } from '../../components/index';
import { sweExperience, idea } from '../../constants/profleCreationData';

const InputBackgroundScreen2 = ({ route, navigation }) => {
  const [ideaIndex, setIdeaIndex] = React.useState(new IndexPath(0));
  const displayIdea = idea[ideaIndex.row];

  const [sweIndex, setSWEIndex] = React.useState(new IndexPath(0));
  const displaySWE = sweExperience[sweIndex.row];

  const [bio, setBio] = React.useState('');
  const [github, setGithub] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');

  const navigateRegistration = () => {
    navigation.navigate('InputBackground3', {
      ...route.params,
      background: {
        ...route.params.background,
        idea: displayIdea,
        sweExperience: displaySWE,
        biography: bio,
        github: `https://github.com/${github}`,
        linkedin: `https://www.linkedin.com/${linkedin}`
      }
    });
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
            <Text style={styles.screenTitle}>Personal Background </Text>
            <Text style={styles.screenCaption}>
              Let others find out more about you!
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Select
              style={styles.selectInput}
              selectedIndex={ideaIndex}
              value={displayIdea}
              onSelect={index => setIdeaIndex(index)}
              label='Do you already have an idea in mind?'
            >
              {idea.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={sweIndex}
              value={displaySWE}
              onSelect={index => setSWEIndex(index)}
              label='Choose your SWE experience level'
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Input
              style={styles.bioInput}
              multiline={true}
              textStyle={styles.bioText}
              placeholder='Bio'
              label='Provide a short bio about yourself (Optional)'
              onChangeText={input => setBio(input)}
              numberOfLines={5}
              value={bio}
            />
            <Input
              style={styles.bioInput}
              placeholder='GitHub Username'
              label='Github (Optional)'
              onChangeText={input => setGithub(input)}
              value={github}
            />
            <Input
              style={styles.bioInput}
              placeholder='LinkedIn Username'
              label='LinkedIn (Optional)'
              onChangeText={input => setLinkedin(input)}
              value={linkedin}
            />
          </Layout>
          <Layout style={styles.inputContainer}></Layout>
          <Layout style={styles.btnContainer}>
            <Button onPress={navigateRegistration} style={styles.signupBtn}>
              Next
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
    flex: 3,
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
    marginVertical: 30
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
  },
  bioInput: {
    width: '70%',
    marginVertical: 10
  },
  bioText: {
    minHeight: 64,
    paddingVertical: 10,
    textAlignVertical: 'top'
  }
});

export default InputBackgroundScreen2;
