import React from 'react';
import _ from 'lodash';
import {
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Layout,
    Text,
    IndexPath,
    Select,
    SelectItem
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

import { TitleHeader, FloatingSave, Toast } from '../../components/index';
import {
    yearData,
    degreeData,
    commitmentData,
    genderData,
    sweExperience,
    interestsData,
    GAMEDEV_DATA,
    WEDDEV_DATA,
    MOBILEDEV_DATA,
    DB_DATA,
    ML_DATA
} from '../../constants/profleCreationData';
import * as userActions from '../../redux/actions/user';

const EditPrefScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertStatus, setAlertStatus] = React.useState('');
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
        gamedevValue: preferences.technologyExperience.game.map(value => {
            return GAMEDEV_DATA[0].children.filter(obj => obj.name === value)[0]
                .id;
        }),
        webValue: preferences.technologyExperience.web.map(value => {
            return WEDDEV_DATA[0].children.filter(obj => obj.name === value)[0]
                .id;
        }),
        mobileValue: preferences.technologyExperience.mobile.map(value => {
            return MOBILEDEV_DATA[0].children.filter(
                obj => obj.name === value
            )[0].id;
        }),
        dbValue: preferences.technologyExperience.database.map(value => {
            return DB_DATA[0].children.filter(obj => obj.name === value)[0].id;
        }),
        mlValue: preferences.technologyExperience.machineLearning.map(value => {
            return ML_DATA[0].children.filter(obj => obj.name === value)[0].id;
        }),
        yearValue: preferences.year,
        degreeValue: preferences.degree,
        commitmentValue: preferences.commitment,
        genderValue: preferences.gender,
        expValue: preferences.sweExperience,
        interestsValue: preferences.interests,
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
        }),
        interestsIndex: preferences.interests.map(index => {
            return new IndexPath(interestsData.indexOf(index));
        })
    };
    const myReducer = (currState, action) => {
        switch (action.type) {
            case 'changeGamedev':
                return {
                    ...currState,
                    gamedevValue: action.gamedevValue
                };
            case 'changeWebdev':
                return {
                    ...currState,
                    webValue: action.webValue
                };
            case 'changeMobiledev':
                return {
                    ...currState,
                    mobileValue: action.mobileValue
                };
            case 'changeDB':
                return {
                    ...currState,
                    dbValue: action.dbValue
                };
            case 'changeML':
                return {
                    ...currState,
                    mlValue: action.mlValue
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
            case 'changeInterests':
                return {
                    ...currState,
                    interestsValue: action.interestsValue,
                    interestsIndex: action.interestsIndex
                };
        }
    };
    const [currState, myDispatch] = React.useReducer(myReducer, initialState);

    const COLOURS = {
        primary: '#407bff',
        chipColor: '#407bff'
    };

    const noResultsComponent = () => (
        <Text style={styles.noResultsText}>No results found!</Text>
    );

    const saveHandler = () => {
        const prefData = {
            // To add ideas? Boolean yes or no
            preferences: {
                commitment: currState.commitmentValue,
                degree: currState.degreeValue,
                gender: currState.genderValue,
                interests: currState.interestsValue,
                sweExperience: currState.expValue,
                technologyExperience: {
                    game: currState.gamedevValue.map(
                        index =>
                            GAMEDEV_DATA[0].children.filter(
                                obj => obj.id === index
                            )[0].name
                    ),
                    web: currState.webValue.map(
                        index =>
                            WEDDEV_DATA[0].children.filter(
                                obj => obj.id === index
                            )[0].name
                    ),
                    mobile: currState.mobileValue.map(
                        index =>
                            MOBILEDEV_DATA[0].children.filter(
                                obj => obj.id === index
                            )[0].name
                    ),
                    database: currState.dbValue.map(
                        index =>
                            DB_DATA[0].children.filter(
                                obj => obj.id === index
                            )[0].name
                    ),
                    machineLearning: currState.mlValue.map(
                        index =>
                            ML_DATA[0].children.filter(
                                obj => obj.id === index
                            )[0].name
                    )
                },
                year: currState.yearValue
            }
        };

        try {
            dispatch(userActions.updatePref(prefData));
            setPreferencesData(prefData.preferences);
            setError(null);

            setAlertMessage("Preferences' changes saved!");
            setShowAlert(true);
            setAlertStatus('success');
        } catch (err) {
            setError(err.message);
        }
    };

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                let finalPref = {
                    commitment: currState.commitmentValue,
                    degree: currState.degreeValue,
                    gender: currState.genderValue,
                    interests: currState.interestsValue,
                    sweExperience: currState.expValue,
                    technologyExperience: {
                        game: currState.gamedevValue.map(
                            index =>
                                GAMEDEV_DATA[0].children.filter(
                                    obj => obj.id === index
                                )[0].name
                        ),
                        web: currState.webValue.map(
                            index =>
                                WEDDEV_DATA[0].children.filter(
                                    obj => obj.id === index
                                )[0].name
                        ),
                        mobile: currState.mobileValue.map(
                            index =>
                                MOBILEDEV_DATA[0].children.filter(
                                    obj => obj.id === index
                                )[0].name
                        ),
                        database: currState.dbValue.map(
                            index =>
                                DB_DATA[0].children.filter(
                                    obj => obj.id === index
                                )[0].name
                        ),
                        machineLearning: currState.mlValue.map(
                            index =>
                                ML_DATA[0].children.filter(
                                    obj => obj.id === index
                                )[0].name
                        )
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
                            {
                                text: 'Leave',
                                style: 'destructive',
                                // If the user confirmed, then we dispatch the action we blocked earlier
                                // This will continue the action that had triggered the removal of the screen
                                onPress: () =>
                                    navigation.dispatch(e.data.action)
                            },
                            { text: 'Stay', style: 'cancel', onPress: () => {} }
                        ]
                    );
                }
            }),
        [navigation, currState, preferencesData]
    );

    return (
        <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.parentContainer}>
                <TitleHeader navProps={navProps} />
                {showAlert && (
                    <Toast
                        message={alertMessage}
                        status={alertStatus}
                        hide={show => setShowAlert(show)}
                    />
                )}
                <ScrollView>
                    <Layout style={styles.inputContainer}>
                        <Text style={styles.screenTitle}>
                            Partner Preferences
                        </Text>
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
                            label='Degree'
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
                        <Select
                            label='Areas of Interest'
                            style={styles.selectInput}
                            multiSelect={true}
                            selectedIndex={currState.interestsIndex}
                            onSelect={input =>
                                myDispatch({
                                    type: 'changeInterests',
                                    interestsValue: input.map(index => {
                                        return interestsData[index.row];
                                    }),
                                    interestsIndex: input
                                })
                            }
                            placeholder='Select'
                            value={currState.interestsValue.join(', ')}
                        >
                            {interestsData.map((value, key) => (
                                <SelectItem key={key} title={value} />
                            ))}
                        </Select>
                    </Layout>
                    <Layout style={styles.techExpContainer}>
                        <Text style={{ ...styles.screenTitle, marginTop: 20 }}>
                            Technology Experience
                        </Text>
                        <Layout style={styles.techExpChildContainer}>
                            <Text category='label' style={styles.inputLabel}>
                                Game Development
                            </Text>
                            <SectionedMultiSelect
                                items={GAMEDEV_DATA}
                                IconRenderer={MaterialIcons}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Select'
                                onSelectedItemsChange={input =>
                                    myDispatch({
                                        type: 'changeGamedev',
                                        gamedevValue: input.map(index => {
                                            return GAMEDEV_DATA[0].children[
                                                index
                                            ].id;
                                        }),
                                        gamedevIndex: input
                                    })
                                }
                                selectedItems={currState.gamedevValue}
                                readOnlyHeadings
                                showRemoveAll
                                expandDropDowns
                                showDropDowns={false}
                                styles={multiStyles}
                                colors={COLOURS}
                                searchPlaceholderText='Search Technology'
                                noResultsComponent={noResultsComponent}
                                removeAllText='Clear All'
                            />
                        </Layout>

                        <Layout style={styles.techExpChildContainer}>
                            <Text category='label' style={styles.inputLabel}>
                                Web Development
                            </Text>
                            <SectionedMultiSelect
                                items={WEDDEV_DATA}
                                IconRenderer={MaterialIcons}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Select'
                                onSelectedItemsChange={input =>
                                    myDispatch({
                                        type: 'changeWebdev',
                                        webValue: input.map(index => {
                                            return WEDDEV_DATA[0].children[
                                                index
                                            ].id;
                                        })
                                    })
                                }
                                selectedItems={currState.webValue}
                                readOnlyHeadings
                                showRemoveAll
                                expandDropDowns
                                showDropDowns={false}
                                styles={multiStyles}
                                colors={COLOURS}
                                searchPlaceholderText='Search Technology'
                                noResultsComponent={noResultsComponent}
                                removeAllText='Clear All'
                            />
                        </Layout>

                        <Layout style={styles.techExpChildContainer}>
                            <Text category='label' style={styles.inputLabel}>
                                Mobile Development
                            </Text>
                            <SectionedMultiSelect
                                items={MOBILEDEV_DATA}
                                IconRenderer={MaterialIcons}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Select'
                                onSelectedItemsChange={input =>
                                    myDispatch({
                                        type: 'changeMobiledev',
                                        mobileValue: input.map(index => {
                                            return MOBILEDEV_DATA[0].children[
                                                index
                                            ].id;
                                        }),
                                        mobileIndex: input
                                    })
                                }
                                selectedItems={currState.mobileValue}
                                readOnlyHeadings
                                showRemoveAll
                                expandDropDowns
                                showDropDowns={false}
                                styles={multiStyles}
                                colors={COLOURS}
                                searchPlaceholderText='Search Technology'
                                noResultsComponent={noResultsComponent}
                                removeAllText='Clear All'
                            />
                        </Layout>

                        <Layout style={styles.techExpChildContainer}>
                            <Text category='label' style={styles.inputLabel}>
                                Database
                            </Text>
                            <SectionedMultiSelect
                                items={DB_DATA}
                                IconRenderer={MaterialIcons}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Select'
                                onSelectedItemsChange={input =>
                                    myDispatch({
                                        type: 'changeDB',
                                        dbValue: input.map(index => {
                                            return DB_DATA[0].children[index]
                                                .id;
                                        }),
                                        dbIndex: input
                                    })
                                }
                                selectedItems={currState.dbValue}
                                readOnlyHeadings
                                showRemoveAll
                                expandDropDowns
                                showDropDowns={false}
                                styles={multiStyles}
                                colors={COLOURS}
                                searchPlaceholderText='Search Technology'
                                noResultsComponent={noResultsComponent}
                                removeAllText='Clear All'
                            />
                        </Layout>

                        <Layout style={styles.techExpChildContainer}>
                            <Text category='label' style={styles.inputLabel}>
                                Machine Learning
                            </Text>
                            <SectionedMultiSelect
                                items={ML_DATA}
                                IconRenderer={MaterialIcons}
                                uniqueKey='id'
                                subKey='children'
                                selectText='Select'
                                onSelectedItemsChange={input =>
                                    myDispatch({
                                        type: 'changeML',
                                        mlValue: input.map(index => {
                                            return ML_DATA[0].children[index]
                                                .id;
                                        }),
                                        mlIndex: input
                                    })
                                }
                                selectedItems={currState.mlValue}
                                readOnlyHeadings
                                showRemoveAll
                                expandDropDowns
                                showDropDowns={false}
                                styles={multiStyles}
                                colors={COLOURS}
                                searchPlaceholderText='Search Technology'
                                noResultsComponent={noResultsComponent}
                                removeAllText='Clear All'
                            />
                        </Layout>
                    </Layout>
                </ScrollView>
                <FloatingSave saveHandler={saveHandler} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    formContainer: {
        flex: 1
    },
    parentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputContainer: {
        marginVertical: 14,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    techExpContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 80
    },
    techExpChildContainer: {
        flex: 1,
        width: '70%'
    },
    selectInput: {
        width: '70%',
        marginVertical: 10
    },
    inputLabel: {
        marginTop: 10,
        marginBottom: 4
    },
    noResultsText: {
        marginTop: 20,
        textAlign: 'center'
    },
    screenTitle: {
        color: '#407BFF',
        fontSize: 20,
        fontWeight: 'bold',
        width: '70%'
    }
});

const multiStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderColor: 'blue'
    },
    searchBar: {
        width: '96%'
    },
    searchTextInput: {
        width: '70%'
    },
    selectToggle: {
        marginBottom: 10,
        backgroundColor: '#F2F2F2',
        padding: 8,
        borderRadius: 2
    },
    parentChipContainer: {
        width: '70%'
    },
    chipsWrapper: {
        width: '70%'
    }
});

export default EditPrefScreen;
