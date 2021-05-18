import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Select,
  SelectItem,
  Text
} from '@ui-kitten/components';
import { ProfileHeader } from '../components/navigation/index';

const InputBackgroundScreen3 = ({ navigation }) => {
  const navigateDetails = () => {
    console.log('btn pressed');
  };

  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const gameDevData = [
    'Unity',
    'Gamemaker',
    'pygame',
    'Unreal Engine',
    'CryEngine',
    'Amazon Lumberyard',
    'Phaser'
  ];
  const displayGameDev = selectedIndex.map(index => {
    return gameDevData[index.row];
  });
  const [selectedWebIndex, setselectedWebIndex] = React.useState([]);
  const webDevData = [
    'React',
    'Angular',
    'Ember.js',
    'Vue.js',
    'Metero',
    'Express.js',
    'Django',
    'Flask',
    'Rails',
    'Laravel',
    'Spring',
    'ASP .NET',
    'GraphQL',
    'Telegram Bot',
    'Browser Extension'
  ];

  const displayWebDev = selectedWebIndex.map(index => {
    return webDevData[index.row];
  });

  const mobileDevData = [
    'Xcode',
    'Android Studio',
    'Flutter',
    'React Native',
    'NativeScripts',
    'Ionic',
    'Xamarin',
    'Corona',
    'Cordova'
  ];
  const [selectedMobileIndex, setselectedMobileIndex] = React.useState([]);
  const displaymobileDev = selectedMobileIndex.map(index => {
    return mobileDevData[index.row];
  });

  const dbData = [
    'Oracle',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'IBM Db2',
    'Firebase',
    'SQLite',
    'Cassandra',
    'MariaDB'
  ];
  const [selectedDbIndex, setselectedDbIndex] = React.useState([]);
  const displayDb = selectedDbIndex.map(index => {
    return dbData[index.row];
  });

  const mlData = [
    'TensorFlow',
    'PyTorch',
    'Keras',
    'scikit-learn',
    'RapidMiner',
    'Caffe2',
    'NLTK',
    'Google Cloud AutoML',
    'Amazon ML'
  ];
  const [selectedMlIndex, setselectedMlIndex] = React.useState([]);
  const displayMl = selectedMlIndex.map(index => {
    return mlData[index.row];
  });

  let navProps = {
    navigation: navigation,
    needBackNav: true
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader {...navProps} />
      <Layout style={styles.textContainer}>
        <Text style={styles.screenTitle}>Technology Experience</Text>
        <Text style={styles.screenCaption}>
          Let others know what you're great at!
        </Text>
      </Layout>
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
          {gameDevData.map((prop, key) => (
            <SelectItem key={key} title={prop} />
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
          {webDevData.map((prop, key) => (
            <SelectItem key={key} title={prop} />
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
          {mobileDevData.map((prop, key) => (
            <SelectItem key={key} title={prop} />
          ))}
        </Select>

        <Select
          label='Database'
          style={styles.selectInput}
          multiSelect={true}
          selectedIndex={selectedMlIndex}
          onSelect={index => setselectedDbIndex(index)}
          placeholder='Select'
          value={displayMl.join(', ')}
        >
          {dbData.map((prop, key) => (
            <SelectItem key={key} title={prop} />
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
          {mlData.map((prop, key) => (
            <SelectItem key={key} title={prop} />
          ))}
        </Select>
      </Layout>
      <Layout style={styles.btnContainer}>
        <Button onPress={navigateDetails} style={styles.signupBtn}>
          Next
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    marginVertical: 5,
    alignItems: 'center'
  },
  textInput: {
    width: '70%'
  },
  signupBtn: {
    width: '70%',
    marginVertical: 30,
    backgroundColor: '#407BFF'
  },
  selectInput: {
    width: '70%',
    marginVertical: 10
  },
  screenTitle: {
    color: '#407BFF',
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%'
  },
  screenCaption: {
    color: '#8cb0ff',
    fontSize: 12,
    fontWeight: 'bold',
    width: '70%'
  }
});

export default InputBackgroundScreen3;
