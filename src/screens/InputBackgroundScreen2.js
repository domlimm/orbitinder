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
import { BackTopNav, ProfileHeader } from '../components/navigation/index';

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
      <ProfileHeader {...navProps} />
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
    marginVertical: 20,
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
