import React from 'react';
import _ from 'lodash';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Button,
  Layout,
  Text,
  Card,
  Modal,
  IndexPath,
  Select,
  SelectItem,
  Input,
  Divider
} from '@ui-kitten/components';

import { TitleHeader, FloatingSave } from '../../components/index';
import {
  yearData,
  commitmentData,
  idea,
  achievementData,
  sweExperience,
  gameDevData,
  webDevData,
  mobileDevData,
  dbData,
  mlData
} from '../../constants/profleCreationData';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../redux/actions/user';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const userData = useSelector(state => state.user.userData);
  const background = userData.background;
  const [bgData, setBgData] = React.useState(background);

  const navProps = {
    title: 'Edit Profile',
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false
  };
  const initialState = {
    bioValue: background.biography,
    yearValue: background.year,
    degreeValue: background.degree,
    ideaValue: background.idea,
    commitmentValue: background.commitment,
    achievementValue: background.achievement,
    sweValue: background.sweExperience,
    gamedevValue: background.technologyExperience.game,
    webValue: background.technologyExperience.web,
    mobileValue: background.technologyExperience.mobile,
    dbValue: background.technologyExperience.database,
    mlValue: background.technologyExperience.machineLearning,
    yearIndex: new IndexPath(yearData.indexOf(background.year)),
    ideaIndex: new IndexPath(idea.indexOf(background.idea)),
    commitmentIndex: new IndexPath(
      commitmentData.indexOf(background.commitment)
    ),
    achievementIndex: new IndexPath(
      achievementData.indexOf(background.achievement)
    ),
    sweIndex: new IndexPath(sweExperience.indexOf(background.sweExperience)),
    gamedevIndex: background.technologyExperience.game.map(index => {
      return new IndexPath(gameDevData.indexOf(index));
    }),
    webIndex: background.technologyExperience.web.map(index => {
      return new IndexPath(webDevData.indexOf(index));
    }),
    mobileIndex: background.technologyExperience.mobile.map(index => {
      return new IndexPath(mobileDevData.indexOf(index));
    }),
    dbIndex: background.technologyExperience.database.map(index => {
      return new IndexPath(dbData.indexOf(index));
    }),
    mlIndex: background.technologyExperience.machineLearning.map(index => {
      return new IndexPath(mlData.indexOf(index));
    })
  };
  const myReducer = (currState, action) => {
    switch (action.type) {
      case 'changeBio':
        return { ...currState, bioValue: action.bioValue };
      case 'changeYear':
        return {
          ...currState,
          yearValue: action.yearValue,
          yearIndex: action.yearIndex
        };
      case 'changeIdea':
        return {
          ...currState,
          ideaValue: action.ideaValue,
          ideaIndex: action.ideaIndex
        };
      case 'changeCommitment':
        return {
          ...currState,
          commitmentValue: action.commitmentValue,
          commitmentIndex: action.commitmentIndex
        };
      case 'changeAchievement':
        return {
          ...currState,
          achievementValue: action.achievementValue,
          achievementIndex: action.achievementIndex
        };
      case 'changeSWE':
        return {
          ...currState,
          sweValue: action.sweValue,
          sweIndex: action.sweIndex
        };
      case 'changeGamedev':
        return {
          ...currState,
          gamedevValue: action.gamedevValue,
          gamedevIndex: action.gamedevIndex
        };
      case 'changeWebdev':
        return {
          ...currState,
          webValue: action.webValue,
          webIndex: action.webIndex
        };
      case 'changeMobiledev':
        return {
          ...currState,
          mobileValue: action.mobileValue,
          mobileIndex: action.mobileIndex
        };
      case 'changeDB':
        return {
          ...currState,
          dbValue: action.dbValue,
          dbIndex: action.dbIndex
        };
      case 'changeML':
        return {
          ...currState,
          mlValue: action.mlValue,
          mlIndex: action.mlIndex
        };
    }
  };
  const [currState, currdispatch] = React.useReducer(myReducer, initialState);
  const saveHandler = () => {
    const backgroundData = {
      background: {
        biography: currState.bioValue,
        commitment: currState.commitmentValue,
        degree: currState.degreeValue,
        idea: currState.ideaValue,
        achievement: currState.achievementValue,
        sweExperience: currState.sweValue,
        technologyExperience: {
          game: currState.gamedevValue,
          web: currState.webValue,
          mobile: currState.mobileValue,
          database: currState.dbValue,
          machineLearning: currState.mlValue
        },
        year: currState.yearValue
      },
      updatedAt: new Date().toISOString()
    };

    try {
      dispatch(userActions.updateProfile(backgroundData));
      setBgData(backgroundData.background);
      setError(null);
      setVisible(!visible);
    } catch (err) {
      setError(err.message);
    }
    setVisible(!visible);
  };

  const [visible, setVisible] = React.useState(false); // for save modal

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        //backRemove
        console.log('back nav');
        let finalB = {
          achievement: currState.achievementValue,
          biography: currState.bioValue,
          commitment: currState.commitmentValue,
          degree: currState.degreeValue,
          idea: currState.ideaValue,
          sweExperience: currState.sweValue,
          technologyExperience: {
            database: currState.dbValue,
            game: currState.gamedevValue,
            machineLearning: currState.mlValue,
            mobile: currState.mobileValue,
            web: currState.webValue
          },
          year: currState.yearValue
        };
        if (_.isEqual(bgData, finalB)) {
          return;
        } else {
          e.preventDefault();
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action)
              }
            ]
          );
        }
      }),
    [navigation, currState, bgData]
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <ScrollView>
          <TitleHeader navProps={navProps} />
          <Layout style={styles.inputContainer}>
            <Text style={styles.screenTitle1}>Personal Information</Text>
            <Select
              style={styles.selectInput}
              value={currState.yearValue}
              selectedIndex={currState.yearIndex}
              onSelect={index =>
                currdispatch({
                  type: 'changeYear',
                  yearValue: yearData[index.row],
                  yearIndex: index
                })
              }
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
              onChangeText={input =>
                currdispatch({
                  type: 'changeBio',
                  bioValue: input
                })
              }
              numberOfLines={6}
              value={currState.bioValue}
            />
            <Select
              style={styles.selectInput}
              value={currState.ideaValue}
              selectedIndex={currState.ideaIndex}
              onSelect={index =>
                currdispatch({
                  type: 'changeIdea',
                  ideaValue: idea[index.row],
                  ideaIndex: index
                })
              }
              label='Do you already have an idea in mind?'
            >
              {idea.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Select
              style={styles.selectInput}
              selectedIndex={currState.commitmentIndex}
              value={currState.commitmentValue}
              onSelect={index =>
                currdispatch({
                  type: 'changeCommitment',
                  commitmentValue: commitmentData[index.row],
                  commitmentIndex: index
                })
              }
              label='Commitment to Orbital'
            >
              {commitmentData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={currState.achievementIndex}
              value={currState.achievementValue}
              onSelect={index =>
                currdispatch({
                  type: 'changeAchievement',
                  achievementValue: achievementData[index.row],
                  achievementIndex: index
                })
              }
              label='Orbital Achievement Level'
            >
              {achievementData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              style={styles.selectInput}
              selectedIndex={currState.sweIndex}
              value={currState.sweValue}
              onSelect={index =>
                currdispatch({
                  type: 'changeSWE',
                  sweValue: sweExperience[index.row],
                  sweIndex: index
                })
              }
              label='Choose your SWE experience level'
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Divider />
            <Text style={styles.screenTitle}>Technology Experience</Text>
            <Select
              label='Game Development'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.gamedevIndex}
              onSelect={input =>
                currdispatch({
                  type: 'changeGamedev',
                  gamedevValue: input.map(index => {
                    return gameDevData[index.row];
                  }),
                  gamedevIndex: input
                })
              }
              placeholder='Select'
              value={currState.gamedevValue.join(', ')}
            >
              {gameDevData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Web Development'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.webIndex}
              onSelect={input =>
                currdispatch({
                  type: 'changeWebdev',
                  webValue: input.map(index => {
                    return webDevData[index.row];
                  }),
                  webIndex: input
                })
              }
              placeholder='Select'
              value={currState.webValue.join(', ')}
            >
              {webDevData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Mobile Development'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.mobileIndex}
              onSelect={input =>
                currdispatch({
                  type: 'changeMobiledev',
                  mobileValue: input.map(index => {
                    return mobileDevData[index.row];
                  }),
                  mobileIndex: input
                })
              }
              placeholder='Select'
              value={currState.mobileValue.join(', ')}
            >
              {mobileDevData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Database'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.dbIndex}
              onSelect={input =>
                currdispatch({
                  type: 'changeDB',
                  dbValue: input.map(index => {
                    return dbData[index.row];
                  }),
                  dbIndex: input
                })
              }
              placeholder='Select'
              value={currState.dbValue.join(', ')}
            >
              {dbData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Machine Learning'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.mlIndex}
              onSelect={input =>
                currdispatch({
                  type: 'changeML',
                  mlValue: input.map(index => {
                    return mlData[index.row];
                  }),
                  mlIndex: input
                })
              }
              placeholder='Select'
              value={currState.mlValue.join(', ')}
            >
              {mlData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
          </Layout>
          <Layout>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >
              <Card disabled={true}>
                <Text>Profile Has been saved</Text>
                <Button
                  style={styles.dismissBtn}
                  size='small'
                  onPress={() => setVisible(false)}
                >
                  DISMISS
                </Button>
              </Card>
            </Modal>
          </Layout>
        </ScrollView>
        <FloatingSave saveHandler={saveHandler} />
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    // backgroundColor: '#F7F7F7',
    backgroundColor: 'white'
  },
  inputContainer: {
    // flex: 3,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10
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
  screenTitle: {
    color: '#407BFF',
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    marginTop: 20
  },
  screenTitle1: {
    color: '#407BFF',
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%'
  },
  discardAlertBtnContainer: {
    flexDirection: 'row'
    // flex: 1,
    // alignItems: 'center'
  },
  discardAlertBtn: { marginVertical: 10, marginHorizontal: 5 },
  discardAlertText: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  dismissBtn: {
    marginVertical: 15
  }
});
export default EditProfileScreen;
