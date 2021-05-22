import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Card,
  Modal,
  IndexPath,
  Select,
  SelectItem,
  Input
} from '@ui-kitten/components';

import { TitleHeader } from '../../components/index';
import {
  yearData,
  commitmentData,
  idea,
  achievementData,
  sweExperience
} from '../../constants/profleCreationData';
import { userData } from '../../constants/userData';

const EditProfileScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  let navProps = {
    title: 'Edit Profile',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };

  const [data, setData] = React.useState(userData);
  const [yearIndex, setYearIndex] = React.useState(
    new IndexPath(yearData.indexOf(userData.year))
  );
  const [displayYear, setDisplayYear] = React.useState(yearData[yearIndex.row]);
  const [bio, setBio] = React.useState(userData.bio);

  const [commitmentIndex, setCommitmentIndex] = React.useState(
    new IndexPath(
      commitmentData.indexOf(userData.commitment.concat(' Commitment'))
    )
  );
  const [displayCommitment, setDisplayCommitment] = React.useState(
    commitmentData[commitmentIndex.row]
  );

  const [ideaIndex, setIdeaIndex] = React.useState(
    new IndexPath(idea.indexOf(userData.idea))
  );
  const [displayIdea, setDisplayIdea] = React.useState(idea[ideaIndex.row]);

  const [achievementIndex, setAchievementIndex] = React.useState(
    new IndexPath(achievementData.indexOf(userData.level))
  );
  const [displayAchievement, setDisplayAchievement] = React.useState(
    achievementData[achievementIndex.row]
  );

  const [sweIndex, setSWEIndex] = React.useState(
    new IndexPath(sweExperience.indexOf(userData.codingExpLevel))
  );
  const [displaySWE, setDisplaySWE] = React.useState(
    sweExperience[sweIndex.row]
  );

  const changeSelectHandler = input => {
    setYearIndex(input);
    setDisplayYear(yearData[yearIndex.row]);
  };

  const changeTextHandler = input => {
    setBio(input);
  };

  const changeCommitmentHandler = input => {
    setCommitmentIndex(input);
    setDisplayCommitment(commitmentData[commitmentIndex.row]);
  };

  const changeIdeaHandler = input => {
    setIdeaIndex(input);
    setDisplayIdea(idea[ideaIndex.row]);
  };

  const changeAchievementHandler = input => {
    setAchievementIndex(input);
    setDisplayAchievement(achievementData[achievementIndex.row]);
  };

  const changeSWEHandler = input => {
    setSWEIndex(input);
    setDisplaySWE(sweExperience[sweIndex.row]);
  };

  React.useEffect(() => {
    setDisplayYear(yearData[yearIndex.row]);
  }, [changeSelectHandler]);

  React.useEffect(() => {
    setBio(bio);
  }, [changeTextHandler]);

  React.useEffect(() => {
    setDisplayIdea(idea[ideaIndex.row]);
  }, [changeIdeaHandler]);

  React.useEffect(() => {
    setDisplayCommitment(commitmentData[commitmentIndex.row]);
  }, [changeCommitmentHandler]);

  React.useEffect(() => {
    setDisplayAchievement(achievementData[achievementIndex.row]);
  }, [changeAchievementHandler]);

  React.useEffect(() => {
    setDisplaySWE(sweExperience[sweIndex.row]);
  }, [changeSWEHandler]);

  const saveHandler = () => {
    setData({
      ...userData,
      year: displayYear,
      bio: bio,
      commitment: displayCommitment,
      idea: displayIdea,
      level: displayAchievement,
      codingExpLevel: displaySWE
    });
    setVisible(!visible);
  };
  console.log(data);
  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <ScrollView>
          <TitleHeader navProps={navProps} />
          {/* <EditProfile />
           */}
          <Layout style={styles.inputContainer}>
            <Select
              style={styles.selectInput}
              selectedIndex={yearIndex}
              value={displayYear}
              onSelect={index => changeSelectHandler(index)}
              label='Year of Study'
            >
              {yearData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Input
              style={styles.bioInput}
              multiline={true}
              textStyle={styles.bioText}
              placeholder='Bio'
              label='Provide a short bio about yourself'
              onChangeText={input => changeTextHandler(input)}
              numberOfLines={6}
              value={bio}
            />
            <Select
              style={styles.selectInput}
              selectedIndex={ideaIndex}
              value={displayIdea}
              onSelect={index => changeIdeaHandler(index)}
              label='Do you already have an idea in mind?'
            >
              {idea.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={commitmentIndex}
              value={displayCommitment}
              onSelect={index => changeCommitmentHandler(index)}
              label='Commitment to Orbital'
            >
              {commitmentData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={achievementIndex}
              value={displayAchievement}
              onSelect={index => changeAchievementHandler(index)}
              label='Orbital Achievement Level'
            >
              {achievementData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={sweIndex}
              value={displaySWE}
              onSelect={index => changeSWEHandler(index)}
              label='Choose your SWE experience level'
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
          </Layout>
          <Layout style={styles.btnContainer}>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >
              <Card disabled={true}>
                <Text>Profile Has been saved</Text>
                <Button onPress={() => setVisible(false)}>DISMISS</Button>
              </Card>
            </Modal>
          </Layout>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
          onPress={saveHandler}
        >
          <Image
            source={require('../../assets/images/save-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  inputContainer: {
    // flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btnContainer: {
    flex: 1,
    // alignItems: 'center'
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  stateBtn: {
    width: '35%',
    marginVertical: 30
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  selectInput: {
    width: '70%',
    marginVertical: 10
  },
  bioText: {
    // minHeight: '40%',
    maxHeight: 200,
    textAlignVertical: 'top'
  },
  bioInput: {
    width: '70%',
    marginVertical: 10
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
    //backgroundColor:'black'
  }
});

export default EditProfileScreen;
