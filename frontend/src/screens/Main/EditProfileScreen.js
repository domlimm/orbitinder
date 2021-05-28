import React from 'react';
import _ from 'lodash';
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
  Input,
  Divider
} from '@ui-kitten/components';

import { TitleHeader } from '../../components/index';
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
import { userData } from '../../constants/userData';

const EditProfileScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const navProps = {
    title: 'Edit Profile',
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false
  };
  const initialState = {
    bioValue: userData.bio,
    yearValue: userData.year,
    ideaValue: userData.idea,
    commitmentValue: userData.commitment,
    achievementValue: userData.level,
    sweValue: userData.codingExpLevel,
    gamedevValue: userData.tech.gamedev,
    webValue: userData.tech.webdev,
    mobileValue: userData.tech.mobiledev,
    dbValue: userData.tech.db,
    mlValue: userData.tech.ml,
    yearIndex: new IndexPath(yearData.indexOf(userData.year)),
    ideaIndex: new IndexPath(idea.indexOf(userData.idea)),
    commitmentIndex: new IndexPath(commitmentData.indexOf(userData.commitment)),
    achievementIndex: new IndexPath(achievementData.indexOf(userData.level)),
    sweIndex: new IndexPath(sweExperience.indexOf(userData.codingExpLevel)),
    gamedevIndex: userData.tech.gamedev.map(index => {
      return new IndexPath(gameDevData.indexOf(index));
    }),
    webIndex: userData.tech.webdev.map(index => {
      return new IndexPath(webDevData.indexOf(index));
    }),
    mobileIndex: userData.tech.mobiledev.map(index => {
      return new IndexPath(mobileDevData.indexOf(index));
    }),
    dbIndex: userData.tech.db.map(index => {
      return new IndexPath(dbData.indexOf(index));
    }),
    mlIndex: userData.tech.ml.map(index => {
      return new IndexPath(mlData.indexOf(index));
    })
  };
  // console.log('Init', initialState);
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
  const initialUserData = {
    ...userData
  };
  const userDataReducer = (currUserData, action) => {
    switch (action.type) {
      case 'changeUserData':
        console.log('Action', action.dataUser);
        console.log('initialUserDATA', initialUserData);
        return {
          ...currUserData,
          bio: action.dataUser.bioValue,
          year: action.dataUser.yearValue,
          commitment: action.dataUser.commitmentValue,
          idea: action.dataUser.ideaValue,
          level: action.dataUser.achievementValue,
          codingExpLevel: action.dataUser.sweValue,
          tech: {
            ...currUserData.tech,
            gamedev: action.dataUser.gamedevValue,
            webdev: action.dataUser.webValue,
            mobiledev: action.dataUser.mobileValue,
            db: action.dataUser.dbValue,
            ml: action.dataUser.mlValue
          }
        };
    }
  };
  const [currState, dispatch] = React.useReducer(myReducer, initialState);
  const [currUserData, dispatchUserData] = React.useReducer(
    userDataReducer,
    initialUserData
  );
  const [data, setData] = React.useState(userData);
  const saveHandler = () => {
    dispatchUserData({
      type: 'changeUserData',
      dataUser: currState
    });
    setVisible(!visible);
  };

  React.useEffect(() => {
    if (currUserData != initialUserData) {
      console.log('FINAL CURR1', currUserData);
    }
  }, [currUserData]); //only changes on save

  const [visible, setVisible] = React.useState(false); // for save modal
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                <Button size='small' onPress={() => setVisible(false)}>
                  DISMISS
                </Button>
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
  }
});
export default EditProfileScreen;
