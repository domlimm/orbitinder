import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

import {
    GAMEDEV_DATA,
    WEDDEV_DATA,
    MOBILEDEV_DATA,
    DB_DATA,
    ML_DATA
} from '../../constants/profleCreationData';

const ExperienceSelectInputs = ({ getSelections }) => {
    const [gameIndex, setGameIndex] = React.useState([]);
    const onGameChange = game => {
        setGameIndex(game);
    };
    const displayGameDev = React.useMemo(
        () => gameIndex.map(index => GAMEDEV_DATA[0].children[index].name),
        [gameIndex]
    );

    const [webIndex, setWebIndex] = React.useState([]);
    const onWebChange = web => {
        setWebIndex(web);
    };
    const displayWebDev = React.useMemo(
        () => webIndex.map(index => WEDDEV_DATA[0].children[index].name),
        [webIndex]
    );

    const [mobileIndex, setMobileIndex] = React.useState([]);
    const onMobileChange = mobile => {
        setMobileIndex(mobile);
    };
    const displayMobileDev = React.useMemo(
        () => mobileIndex.map(index => MOBILEDEV_DATA[0].children[index].name),
        [mobileIndex]
    );

    const [dbIndex, setDBIndex] = React.useState([]);
    const onDBChange = db => {
        setDBIndex(db);
    };
    const displayDb = React.useMemo(
        () => dbIndex.map(index => DB_DATA[0].children[index].name),
        [dbIndex]
    );

    const [mlIndex, setMLIndex] = React.useState([]);
    const onMLChange = ml => {
        setMLIndex(ml);
    };
    const displayMl = React.useMemo(
        () => mlIndex.map(index => ML_DATA[0].children[index].name),
        [mlIndex]
    );

    const COLOURS = {
        primary: '#407bff',
        chipColor: '#407bff'
    };

    const noResultsComponent = () => (
        <Text style={styles.noResultsText}>No results found!</Text>
    );

    React.useEffect(() => {
        getSelections({
            game: displayGameDev,
            web: displayWebDev,
            mobile: displayMobileDev,
            database: displayDb,
            machineLearning: displayMl
        });
    }, [
        displayGameDev,
        displayWebDev,
        displayMobileDev,
        displayDb,
        displayMl,
        getSelections
    ]);

    return (
        <Layout style={styles.mainContainer}>
            <Layout style={styles.inputContainer}>
                <Text category='label' style={styles.inputLabel}>
                    Game Development
                </Text>
                <SectionedMultiSelect
                    items={GAMEDEV_DATA}
                    IconRenderer={MaterialIcons}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Select'
                    onSelectedItemsChange={onGameChange}
                    selectedItems={gameIndex}
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

            <Layout style={styles.inputContainer}>
                <Text category='label' style={styles.inputLabel}>
                    Web Development
                </Text>
                <SectionedMultiSelect
                    items={WEDDEV_DATA}
                    IconRenderer={MaterialIcons}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Select'
                    onSelectedItemsChange={onWebChange}
                    selectedItems={webIndex}
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

            <Layout style={styles.inputContainer}>
                <Text category='label' style={styles.inputLabel}>
                    Mobile Development
                </Text>
                <SectionedMultiSelect
                    items={MOBILEDEV_DATA}
                    IconRenderer={MaterialIcons}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Select'
                    onSelectedItemsChange={onMobileChange}
                    selectedItems={mobileIndex}
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

            <Layout style={styles.inputContainer}>
                <Text category='label' style={styles.inputLabel}>
                    Database
                </Text>
                <SectionedMultiSelect
                    items={DB_DATA}
                    IconRenderer={MaterialIcons}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Select'
                    onSelectedItemsChange={onDBChange}
                    selectedItems={dbIndex}
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

            <Layout style={styles.inputContainer}>
                <Text category='label' style={styles.inputLabel}>
                    Machine Learning
                </Text>
                <SectionedMultiSelect
                    items={ML_DATA}
                    IconRenderer={MaterialIcons}
                    uniqueKey='id'
                    subKey='children'
                    selectText='Select'
                    onSelectedItemsChange={onMLChange}
                    selectedItems={mlIndex}
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
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        width: '70%'
    },
    selectInput: {
        marginVertical: 10
    },
    inputLabel: {
        marginTop: 10,
        marginBottom: 4
    },
    noResultsText: {
        marginTop: 20,
        textAlign: 'center'
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

export default ExperienceSelectInputs;
