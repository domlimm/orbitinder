import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
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
import { ProfileHeader } from '../../components/Navigation/index';
import {
  yearData,
  commitmentData,
  achievementData
} from '../../constants/profleCreationData';

const InputBackgroundScreen1 = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('InputBackgroundScreen2');
  };

  const [selectedYearIndex, setSelectedYearIndex] = React.useState(
    new IndexPath(0)
  );
  const displayYear = yearData[selectedYearIndex.row];

  const [selectedCommitmentIndex, setSelectedCommitmentIndex] = React.useState(
    new IndexPath(0)
  );
  const displayCommitment = commitmentData[selectedCommitmentIndex.row];

  const [selectedAchievementIndex, setSelectedAchievementIndex] =
    React.useState(new IndexPath(0));
  const displayAchievement = achievementData[selectedAchievementIndex.row];

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
          selectedIndex={selectedYearIndex}
          value={displayYear}
          onSelect={index => setSelectedYearIndex(index)}
          label='Year of Study'
        >
          {yearData.map((value, key) => (
            <SelectItem key={key} title={value} />
          ))}
        </Select>
        <Input label='Degree' style={styles.textInput} />
        <Select
          style={styles.selectInput}
          selectedIndex={selectedCommitmentIndex}
          value={displayCommitment}
          onSelect={index => setSelectedCommitmentIndex(index)}
          label='Commitment to Orbital'
        >
          {commitmentData.map((value, key) => (
            <SelectItem key={key} title={value} />
          ))}
        </Select>
        <Select
          style={styles.selectInput}
          selectedIndex={selectedAchievementIndex}
          value={displayAchievement}
          onSelect={index => setSelectedAchievementIndex(index)}
          label='Orbital Achievement Level'
        >
          {achievementData.map((value, key) => (
            <SelectItem key={key} title={value} />
          ))}
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
    marginVertical: 30
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
    marginVertical: 5,
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
