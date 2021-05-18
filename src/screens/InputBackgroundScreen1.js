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

const InputBackgroundScreen1 = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('InputBackgroundScreen2');
  };

  const [selectedYearIndex, setSelectedYearIndex] = React.useState(
    new IndexPath(0)
  );
  const yearData = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  const displayYear = yearData[selectedYearIndex.row];

  const [selectedCommitmentIndex, setSelectedCommitmentIndex] = React.useState(
    new IndexPath(0)
  );
  const commitmentData = [
    'High Commitment',
    'Medium Commitment',
    'Low Commitment'
  ];
  const displayCommitment = commitmentData[selectedCommitmentIndex.row];

  const [selectedAchievementIndex, setSelectedAchievementIndex] =
    React.useState(new IndexPath(0));
  const achievementData = ['Artemis', 'Apollo 11', 'Gemini', 'Vostok'];
  const displayAchievement = achievementData[selectedAchievementIndex.row];

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
          selectedIndex={selectedYearIndex}
          value={displayYear}
          onSelect={index => setSelectedYearIndex(index)}
          label='Year of Study'
        >
          <SelectItem title='Year 1' />
          <SelectItem title='Year 2' />
          <SelectItem title='Year 3' />
          <SelectItem title='Year 4' />
        </Select>
        <Input label='Degree' style={styles.textInput} />
        <Select
          style={styles.selectInput}
          selectedIndex={selectedCommitmentIndex}
          value={displayCommitment}
          onSelect={index => setSelectedCommitmentIndex(index)}
          label='Commitment to Orbital'
        >
          <SelectItem title='High Commitment' />
          <SelectItem title='Medium Commitment' />
          <SelectItem title='Low Commitment' />
        </Select>
        <Select
          style={styles.selectInput}
          selectedIndex={selectedAchievementIndex}
          value={displayAchievement}
          onSelect={index => setSelectedAchievementIndex(index)}
          label='Orbital Achievement Level'
        >
          <SelectItem title='Artemis' />
          <SelectItem title='Apollo' />
          <SelectItem title='Gemini' />
          <SelectItem title='Vostok' />
        </Select>
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
  textInput: {
    width: '70%',
    marginVertical: 10
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
    fontSize: 30,
    fontWeight: 'bold',
    width: '70%'
  },
  textContainer: {
    marginVertical: 20,
    alignItems: 'center'
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

export default InputBackgroundScreen1;
