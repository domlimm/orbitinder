import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Input,
  Select,
  SelectItem,
  Text
} from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { NavHeader } from '../../components/index';
import {
  yearData,
  commitmentData,
  genderData,
  sweExperience
} from '../../constants/prefCreationData';

const PrefInputScreen1 = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const displayGameDev = selectedIndex.map(index => {
    return yearData[index.row];
  });

  const [selectedCommitmentIndex, setSelectedCommitmentIndex] = React.useState(
    []
  );
  const displayCommitment = selectedCommitmentIndex.map(index => {
    return commitmentData[index.row];
  });

  const [selectedGenderIndex, setSelectedGenderIndex] = React.useState([]);
  const displayGender = selectedGenderIndex.map(index => {
    return genderData[index.row];
  });

  const [selectedSWEIndex, setSelectedSWEIndex] = React.useState([]);
  const displaySWE = selectedSWEIndex.map(index => {
    return sweExperience[index.row];
  });

  const navigateDetails = () => {
    navigation.navigate('PrefInput2');
  };

  let navProps = {
    navigation: navigation,
    backNav: true,
    type: 'register'
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <NavHeader navProps={navProps} />
          <Layout style={styles.textContainer}>
            <Text style={styles.screenTitle}>Partner Preferences </Text>
            <Text style={styles.screenCaption}>
              Who would your ideal partner be?
            </Text>
          </Layout>
          <Layout style={styles.inputContainer}>
            <Select
              label='Year of Study'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
              placeholder='Select'
              value={displayGameDev.join(', ')}
            >
              {yearData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Input label='Degree' style={styles.textInput} />

            <Select
              label='Commitment to Orbital'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={selectedCommitmentIndex}
              onSelect={index => setSelectedCommitmentIndex(index)}
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
              selectedIndex={selectedGenderIndex}
              onSelect={index => setSelectedGenderIndex(index)}
              placeholder='Select'
              value={displayGender.join(', ')}
            >
              {genderData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Select
              label='Prefered SWE experience level '
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={selectedSWEIndex}
              onSelect={index => setSelectedSWEIndex(index)}
              placeholder='Select'
              value={displaySWE.join(', ')}
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
          </Layout>
          <Layout style={styles.btnContainer}>
            <Button onPress={navigateDetails} style={styles.signupBtn}>
              Next
            </Button>
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default PrefInputScreen1;
