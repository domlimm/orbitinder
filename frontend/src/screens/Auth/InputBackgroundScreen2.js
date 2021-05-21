import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
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
// To separate for local imports rather than installed dependencies: add below onwards
import { ProfileHeader } from '../../components/index';

const InputBackgroundScreen2 = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('InputBackgroundScreen3');
  };

  const [selectedIdeaIndex, setSelectedIdeaIndex] = React.useState(
    new IndexPath(0)
  );
  const ideaData = ['Yes', 'No'];
  const displayIdea = ideaData[selectedIdeaIndex.row];

  const [selectedSWEIndex, setSelectedSWEIndex] = React.useState(
    new IndexPath(0)
  );
  const sweData = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const displaySWE = sweData[selectedSWEIndex.row];

  const inputBio = (bioValue = '') => {
    const [bio, setBio] = React.useState(bioValue);
    return { bio, onChangeText: setBio };
  };

  let navProps = {
    navigation: navigation,
    needBackNav: true
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader navProps={navProps} />
      <Layout style={styles.textContainer}>
        <Text style={styles.screenTitle}>Personal Background </Text>
        <Text style={styles.screenCaption}>
          Let others find out more about you!
        </Text>
      </Layout>
      <Layout style={styles.inputContainer}>
        <Select
          style={styles.selectInput}
          selectedIndex={selectedIdeaIndex}
          value={displayIdea}
          onSelect={index => setSelectedIdeaIndex(index)}
          label='Do you already have an idea in mind?'
        >
          <SelectItem title='Yes' />
          <SelectItem title='No' />
        </Select>

        <Select
          style={styles.selectInput}
          selectedIndex={selectedSWEIndex}
          value={displaySWE}
          onSelect={index => setSelectedSWEIndex(index)}
          label='Choose your SWE experience level'
        >
          <SelectItem title='Beginner' />
          <SelectItem title='Intermediate' />
          <SelectItem title='Advanced' />
          <SelectItem title='Expert' />
        </Select>
        <Input
          style={styles.bioInput}
          multiline={true}
          textStyle={styles.bioText}
          placeholder='Bio'
          label='Provide a short bio about yourself'
          {...inputBio}
        />
      </Layout>
      <Layout style={styles.btnContainer}>
        <Button onPress={navigateDetails} style={styles.signupBtn}>
          Next
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
    minHeight: '40%',
    maxHeight: '70%',
    textAlignVertical: 'top'
  }
});

export default InputBackgroundScreen2;