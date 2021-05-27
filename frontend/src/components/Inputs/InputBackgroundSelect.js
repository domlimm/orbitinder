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

const InputBackgroundSelect = () => {
  React.useEffect(() => {}, []);

  const [gameIndex, setGameIndex] = React.useState([]);
  const displayGameDev = gameIndex.map(index => {
    return gameDevData[index.row];
  });

  const [webIndex, setWebIndex] = React.useState([]);
  const displayWebDev = webIndex.map(index => {
    return webDevData[index.row];
  });

  const [mobileIndex, setMobileIndex] = React.useState([]);
  const displaymobileDev = mobileIndex.map(index => {
    return mobileDevData[index.row];
  });

  const [dbIndex, setDBIndex] = React.useState([]);
  const displayDb = dbIndex.map(index => {
    return dbData[index.row];
  });

  const [mlIndex, setMLIndex] = React.useState([]);
  const displayMl = mlIndex.map(index => {
    return mlData[index.row];
  });

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
        value={displaymobileDev.join(', ')}
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
  topNav: {
    marginVertical: 5
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: '5%'
  },
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
