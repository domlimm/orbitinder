import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem } from '@ui-kitten/components';

import {
  gameDevData,
  webDevData,
  mobileDevData,
  dbData,
  mlData
} from '../../constants/profleCreationData';

const InputBackgroundSelect = ({ getSelections }) => {
  const [gameIndex, setGameIndex] = React.useState([]);
  const displayGameDev = React.useMemo(
    () => gameIndex.map(index => gameDevData[index.row]),
    [gameIndex]
  );

  const [webIndex, setWebIndex] = React.useState([]);
  const displayWebDev = React.useMemo(
    () => webIndex.map(index => webDevData[index.row]),
    [webIndex]
  );

  const [mobileIndex, setMobileIndex] = React.useState([]);
  const displayMobileDev = React.useMemo(
    () => mobileIndex.map(index => mobileDevData[index.row]),
    [mobileIndex]
  );

  const [dbIndex, setDBIndex] = React.useState([]);
  const displayDb = React.useMemo(
    () => dbIndex.map(index => dbData[index.row]),
    [dbIndex]
  );

  const [mlIndex, setMLIndex] = React.useState([]);
  const displayMl = React.useMemo(
    () => mlIndex.map(index => mlData[index.row]),
    [mlIndex]
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
    <Layout style={styles.inputContainer}>
      <Select
        label='Game Development'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={gameIndex}
        onSelect={index => setGameIndex(index)}
        placeholder='Select'
        value={displayGameDev.join(', ')}
      >
        {gameDevData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>

      <Select
        label='Web Development'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={webIndex}
        onSelect={index => setWebIndex(index)}
        placeholder='Select'
        value={displayWebDev.join(', ')}
      >
        {webDevData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>

      <Select
        label='Mobile Development'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={mobileIndex}
        onSelect={index => setMobileIndex(index)}
        placeholder='Select'
        value={displayMobileDev.join(', ')}
      >
        {mobileDevData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>

      <Select
        label='Database'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={dbIndex}
        onSelect={index => setDBIndex(index)}
        placeholder='Select'
        value={displayDb.join(', ')}
      >
        {dbData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>

      <Select
        label='Machine Learning'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={mlIndex}
        onSelect={index => setMLIndex(index)}
        placeholder='Select'
        value={displayMl.join(', ')}
      >
        {mlData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  selectInput: {
    width: '70%',
    marginVertical: 10
  }
});

export default InputBackgroundSelect;
