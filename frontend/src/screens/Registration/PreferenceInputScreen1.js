import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Select,
  SelectItem,
  Text
} from '@ui-kitten/components';

import { NavHeader } from '../../components/index';
import {
  yearData,
  commitmentData,
  genderData,
  sweExperience,
  degreeData
} from '../../constants/prefCreationData';
import { interestsData } from '../../constants/profleCreationData';
const PrefInputScreen1 = ({ navigation }) => {
  const [yearIndex, setYearIndex] = React.useState([]);
  const displayYear = yearIndex.map(index => {
    return yearData[index.row];
  });

  const [commitmentIndex, setCommitmentIndex] = React.useState([]);
  const displayCommitment = commitmentIndex.map(index => {
    return commitmentData[index.row];
  });

  const [degIndex, setDegIndex] = React.useState([]);
  const displayDegree = degIndex.map(index => {
    return degreeData[index.row];
  });

  const [genderIndex, setGenderIndex] = React.useState([]);
  const displayGender = genderIndex.map(index => {
    return genderData[index.row];
  });

  const [sweIndex, setSWEIndex] = React.useState([]);
  const displaySWE = sweIndex.map(index => {
    return sweExperience[index.row];
  });

  const [interestsIndex, setInterestsIndex] = React.useState([]);
  const displayInterests = interestsIndex.map(index => {
    return interestsData[index.row];
  });

  const navigatePreference = () => {
    navigation.navigate('PrefInput2', {
      year: displayYear,
      degree: displayDegree,
      commitment: displayCommitment,
      gender: displayGender,
      interests: displayInterests,
      sweExperience: displaySWE
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
            <Text style={styles.screenTitle}>Partner Preferences</Text>
            <Text style={styles.screenCaption}>
              Who would your ideal partner be?
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Select
              label='Year of Study'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={yearIndex}
              onSelect={index => setYearIndex(index)}
              placeholder='Select'
              value={displayYear.join(', ')}
            >
              {yearData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Select
              label='Degree'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={degIndex}
              onSelect={index => setDegIndex(index)}
              placeholder='Select'
              value={displayDegree.join(', ')}
            >
              {degreeData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Select
              label='Commitment to Orbital'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={commitmentIndex}
              onSelect={index => setCommitmentIndex(index)}
              placeholder='Select'
              value={displayCommitment.join(', ')}
            >
              {commitmentData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Select
              label='Gender'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={genderIndex}
              onSelect={index => setGenderIndex(index)}
              placeholder='Select'
              value={displayGender.join(', ')}
            >
              {genderData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Areas of Interest'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={interestsIndex}
              onSelect={index => setInterestsIndex(index)}
              placeholder='Select'
              value={displayInterests.join(', ')}
            >
              {interestsData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Prefered SWE experience level '
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={sweIndex}
              onSelect={index => setSWEIndex(index)}
              placeholder='Select'
              value={displaySWE.join(', ')}
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
          </Layout>
          <Layout style={styles.btnContainer}>
            <Button onPress={navigatePreference} style={styles.signupBtn}>
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

export default PrefInputScreen1;
