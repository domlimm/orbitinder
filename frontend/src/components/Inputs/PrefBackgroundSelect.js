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

export default function PrefBackgroundSelect() {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const displayGameDev = selectedIndex.map(index => {
    return gameDevData[index.row];
  });

  const [selectedWebIndex, setselectedWebIndex] = React.useState([]);
  const displayWebDev = selectedWebIndex.map(index => {
    return webDevData[index.row];
  });

  const [selectedMobileIndex, setselectedMobileIndex] = React.useState([]);
  const displaymobileDev = selectedMobileIndex.map(index => {
    return mobileDevData[index.row];
  });

  const [selectedDbIndex, setselectedDbIndex] = React.useState([]);
  const displayDb = selectedDbIndex.map(index => {
    return dbData[index.row];
  });

  const [selectedMlIndex, setselectedMlIndex] = React.useState([]);
  const displayMl = selectedMlIndex.map(index => {
    return mlData[index.row];
  });

  return (
    <Layout style={styles.inputContainer}>
      <Select
        label='Game Development'
        style={styles.selectInput}
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
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
        selectedIndex={selectedWebIndex}
        onSelect={index => setselectedWebIndex(index)}
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
        selectedIndex={selectedMobileIndex}
        onSelect={index => setselectedMobileIndex(index)}
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
        selectedIndex={selectedDbIndex}
        onSelect={index => setselectedDbIndex(index)}
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
        selectedIndex={selectedMlIndex}
        onSelect={index => setselectedMlIndex(index)}
        placeholder='Select'
        value={displayMl.join(', ')}
      >
        {mlData.map((value, key) => (
          <SelectItem key={key} title={value} />
        ))}
      </Select>
    </Layout>
  );
}

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
