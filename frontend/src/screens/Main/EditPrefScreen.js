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
  Divider
} from '@ui-kitten/components';

import { TitleHeader, FloatingSave } from '../../components/index';
import {
  yearData,
  degreeData,
  commitmentData,
  genderData,
  idea,
  sweExperience,
  gameDevData,
  webDevData,
  mobileDevData,
  dbData,
  mlData
} from '../../constants/profleCreationData';
import { partnerPref } from '../../constants/userData';

import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../redux/actions/user';
const EditPrefScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch();

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const userData = useSelector(state => state.user.userData);
  const preferences = userData.preferences;
  const [preferencesData, setPreferencesData] = React.useState(preferences);

  let navProps = {
    title: 'Edit Preferences',
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false
  };
  const initialState = {
    gamedevValue: preferences.technologyExperience.game,
    webValue: preferences.technologyExperience.web,
    mobileValue: preferences.technologyExperience.mobile,
    dbValue: preferences.technologyExperience.database,
    mlValue: preferences.technologyExperience.machineLearning,
    yearValue: preferences.year,
    degreeValue: preferences.degree,
    commitmentValue: preferences.commitment,
    genderValue: preferences.gender,
    expValue: preferences.sweExperience,
    gamedevIndex: preferences.technologyExperience.game.map(index => {
      return new IndexPath(gameDevData.indexOf(index));
    }),
    webIndex: preferences.technologyExperience.web.map(index => {
      return new IndexPath(webDevData.indexOf(index));
    }),
    mobileIndex: preferences.technologyExperience.mobile.map(index => {
      return new IndexPath(mobileDevData.indexOf(index));
    }),
    dbIndex: preferences.technologyExperience.database.map(index => {
      return new IndexPath(dbData.indexOf(index));
    }),
    mlIndex: preferences.technologyExperience.machineLearning.map(index => {
      return new IndexPath(mlData.indexOf(index));
    }),
    yearIndex: preferences.year.map(index => {
      return new IndexPath(yearData.indexOf(index));
    }),
    degreeIndex: preferences.degree.map(index => {
      return new IndexPath(degreeData.indexOf(index));
    }),
    commitmentIndex: preferences.commitment.map(index => {
      return new IndexPath(commitmentData.indexOf(index));
    }),
    genderIndex: preferences.gender.map(index => {
      return new IndexPath(genderData.indexOf(index));
    }),
    expIndex: preferences.sweExperience.map(index => {
      return new IndexPath(sweExperience.indexOf(index));
    })
  };
  const myReducer = (currState, action) => {
    switch (action.type) {
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
      case 'changeYear':
        return {
          ...currState,
          yearValue: action.yearValue,
          yearIndex: action.yearIndex
        };
      case 'changeDegree':
        return {
          ...currState,
          degreeValue: action.degreeValue,
          degreeIndex: action.degreeIndex
        };
      case 'changeCommitment':
        return {
          ...currState,
          commitmentValue: action.commitmentValue,
          commitmentIndex: action.commitmentIndex
        };
      case 'changeGender':
        return {
          ...currState,
          genderValue: action.genderValue,
          genderIndex: action.genderIndex
        };
      case 'changeExpLevel':
        return {
          ...currState,
          expValue: action.expValue,
          expIndex: action.expIndex
        };
    }
  };
  const [currState, myDispatch] = React.useReducer(myReducer, initialState);
  const saveHandler = () => {
    const prefData = {
      //idea?????
      preferences: {
        commitment: currState.commitmentValue,
        degree: currState.degreeValue,
        gender: currState.genderValue,
        sweExperience: currState.expValue,
        technologyExperience: {
          game: currState.gamedevValue,
          web: currState.webValue,
          mobile: currState.mobileValue,
          database: currState.dbValue,
          machineLearning: currState.mlValue
        },
        year: currState.yearValue
      }
    };
    try {
      dispatch(userActions.updatePref(prefData));
      setPreferencesData(prefData.preferences);
      setError(null);
      setVisible(!visible);
    } catch (err) {
      setError(err.message);
    }
    setVisible(!visible);
  };

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        //backRemove
        let finalPref = {
          commitment: currState.commitmentValue,
          degree: currState.degreeValue,
          gender: currState.genderValue,
          sweExperience: currState.expValue,
          technologyExperience: {
            game: currState.gamedevValue,
            web: currState.webValue,
            mobile: currState.mobileValue,
            database: currState.dbValue,
            machineLearning: currState.mlValue
          },
          year: currState.yearValue
        };
        if (_.isEqual(preferencesData, finalPref)) {
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
    [navigation, currState, preferencesData]
  );

  const [visible, setVisible] = React.useState(false); // for save modal
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <ScrollView>
          <TitleHeader navProps={navProps} />
          <Layout style={styles.inputContainer}>
            <Divider />
            <Text style={styles.screenTitle}>Personal Preferences</Text>
            <Select
              label='Year of Study'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.yearIndex}
              onSelect={input =>
                myDispatch({
                  type: 'changeYear',
                  yearValue: input.map(index => {
                    return yearData[index.row];
                  }),
                  yearIndex: input
                })
              }
              placeholder='Select'
              value={currState.yearValue.join(', ')}
            >
              {yearData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Major'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.degreeIndex}
              onSelect={input =>
                myDispatch({
                  type: 'changeDegree',
                  degreeValue: input.map(index => {
                    return degreeData[index.row];
                  }),
                  degreeIndex: input
                })
              }
              placeholder='Select'
              value={currState.degreeValue.join(', ')}
            >
              {degreeData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Commitment Level'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.commitmentIndex}
              onSelect={input =>
                myDispatch({
                  type: 'changeCommitment',
                  commitmentValue: input.map(index => {
                    return commitmentData[index.row];
                  }),
                  commitmentIndex: input
                })
              }
              placeholder='Select'
              value={currState.commitmentValue.join(', ')}
            >
              {commitmentData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='Gender'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.genderIndex}
              onSelect={input =>
                myDispatch({
                  type: 'changeGender',
                  genderValue: input.map(index => {
                    return genderData[index.row];
                  }),
                  genderIndex: input
                })
              }
              placeholder='Select'
              value={currState.genderValue.join(', ')}
            >
              {genderData.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>
            <Select
              label='SWE Experience Level'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.expIndex}
              onSelect={input =>
                myDispatch({
                  type: 'changeExpLevel',
                  expValue: input.map(index => {
                    return sweExperience[index.row];
                  }),
                  expIndex: input
                })
              }
              placeholder='Select'
              value={currState.expValue.join(', ')}
            >
              {sweExperience.map((value, key) => (
                <SelectItem key={key} title={value} />
              ))}
            </Select>

            <Divider />
            <Text style={styles.screenTitle}>
              Technology Experience Preferences
            </Text>
            <Select
              label='Game Development'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.gamedevIndex}
              onSelect={input =>
                myDispatch({
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
                myDispatch({
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
                myDispatch({
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
                myDispatch({
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
                myDispatch({
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
export default EditPrefScreen;
