import React from 'react';
import _ from 'lodash';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
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
  degreeData,
  commitmentData,
  genderData,
  idea,
  achievementData,
  sweExperience,
  gameDevData,
  webDevData,
  mobileDevData,
  dbData,
  mlData
} from '../../constants/profleCreationData';
import { partnerPref } from '../../constants/userData';
const EditPrefScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  let navProps = {
    title: 'Edit Preferences',
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false
  };
  const initialState = {
    gamedevValue: partnerPref.tech.gamedev,
    webValue: partnerPref.tech.webdev,
    mobileValue: partnerPref.tech.mobiledev,
    dbValue: partnerPref.tech.db,
    mlValue: partnerPref.tech.ml,
    yearValue: partnerPref.year,
    degreeValue: partnerPref.degree,
    commitmentValue: partnerPref.commitment,
    genderValue: partnerPref.gender,
    expValue: partnerPref.codingExpLevel,
    gamedevIndex: partnerPref.tech.gamedev.map(index => {
      return new IndexPath(gameDevData.indexOf(index));
    }),
    webIndex: partnerPref.tech.webdev.map(index => {
      return new IndexPath(webDevData.indexOf(index));
    }),
    mobileIndex: partnerPref.tech.mobiledev.map(index => {
      return new IndexPath(mobileDevData.indexOf(index));
    }),
    dbIndex: partnerPref.tech.db.map(index => {
      return new IndexPath(dbData.indexOf(index));
    }),
    mlIndex: partnerPref.tech.ml.map(index => {
      return new IndexPath(mlData.indexOf(index));
    }),
    yearIndex: partnerPref.year.map(index => {
      return new IndexPath(yearData.indexOf(index));
    }),
    degreeIndex: partnerPref.degree.map(index => {
      return new IndexPath(degreeData.indexOf(index));
    }),
    commitmentIndex: partnerPref.commitment.map(index => {
      return new IndexPath(commitmentData.indexOf(index));
    }),
    genderIndex: partnerPref.gender.map(index => {
      return new IndexPath(genderData.indexOf(index));
    }),
    expIndex: partnerPref.codingExpLevel.map(index => {
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
  const initialUserData = {
    ...partnerPref
  };
  const userDataReducer = (currUserData, action) => {
    switch (action.type) {
      case 'changeUserData':
        // console.log('Action', action.dataUser);
        // console.log('initialUserDATA', initialUserData);
        return {
          ...currUserData,
          year: action.dataUser.yearValue,
          degree: action.dataUser.degreeValue,
          commitment: action.dataUser.commitmentValue,
          gender: action.dataUser.genderValue,
          codingExpLevel: action.dataUser.expValue,
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
  const [data, setData] = React.useState(partnerPref);
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
            <Divider />
            <Text style={styles.screenTitle}>Personal Preferences</Text>
            <Select
              label='Year of Study'
              style={styles.selectInput}
              multiSelect={true}
              selectedIndex={currState.yearIndex}
              onSelect={input =>
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
                dispatch({
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
export default EditPrefScreen;
