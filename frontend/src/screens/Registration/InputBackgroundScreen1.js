import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Text
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import { NavHeader } from '../../components/index';
import {
  yearData,
  commitmentData,
  achievementData,
  degreeData,
  interestsData
} from '../../constants/profleCreationData';

const InputBackgroundScreen1 = ({ navigation, route }) => {
  const [yearIndex, setYearIndex] = React.useState(new IndexPath(0));
  const displayYear = yearData[yearIndex.row];

  const [degIndex, setDegIndex] = React.useState(new IndexPath(0));
  const displayDegree = degreeData[degIndex.row];

  // const [interestIndex, setInterestIndex] = React.useState(new IndexPath(0));
  // const displayInterest = interestsData[interestIndex.row];

  const [commitIndex, setCommitIndex] = React.useState(new IndexPath(0));
  const displayCommitment = commitmentData[commitIndex.row];

  const [achieveIndex, setAchieveIndex] = React.useState(new IndexPath(0));
  const displayAchievement = achievementData[achieveIndex.row];

  const [interestIndex, setInterestIndex] = React.useState([]);
  const displayInterest = React.useMemo(
    () => interestIndex.map(index => interestsData[index.row]),
    [interestIndex]
  );

  const { name, gender, userPushToken } = useSelector(state => state.auth);

  const navigateRegistration = () => {
    navigation.navigate('InputBackground2', {
      name: name,
      gender: gender,
      userPushToken: userPushToken,
      background: {
        year: displayYear,
        degree: displayDegree,
        commitment: displayCommitment,
        achievement: displayAchievement,
        interests: displayInterest
      },
      imagePath: route.params.imagePath,
      matched: false,
      matching: false,
      matchId: ''
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
              style={styles.input}
              selectedIndex={yearIndex}
              value={displayYear}
              onSelect={index => setYearIndex(index)}
              label='Year of Study'
            >
              {yearData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.input}
              selectedIndex={degIndex}
              value={displayDegree}
              onSelect={index => setDegIndex(index)}
              label='Degree'
            >
              {degreeData.map((value, key) => {
                if (key === 0) {
                  return <SelectItem key={key} title={value} disabled />;
                }
                return <SelectItem key={key} title={value} />;
              })}
            </Select>
            {/* <Select
              style={styles.input}
              selectedIndex={interestIndex}
              value={displayInterest}
              onSelect={index => setInterestIndex(index)}
              label='Areas of Interest'
            >
              {interestsData.map((value, key) => {
                return <SelectItem key={key} title={value} />;
              })}
            </Select> */}
            <Select
              label='Areas of Interest'
              style={styles.input}
              multiSelect={true}
              selectedIndex={interestIndex}
              onSelect={index => setInterestIndex(index)}
              placeholder='Select'
              value={displayInterest.join(', ')}
            >
              {interestsData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.input}
              selectedIndex={commitIndex}
              value={displayCommitment}
              onSelect={index => setCommitIndex(index)}
              label='Commitment to Orbital'
            >
              {commitmentData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.input}
              selectedIndex={achieveIndex}
              value={displayAchievement}
              onSelect={index => setAchieveIndex(index)}
              label='Orbital Achievement Level'
            >
              {achievementData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
          </Layout>
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    width: '70%',
    marginVertical: 10
  },
  signupBtn: {
    width: '70%',
    marginVertical: 30
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
