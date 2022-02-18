import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';

import { LandingImage, NavHeader } from '../../components/index';

const PreferencesLandingScreen = ({ navigation }) => {
  const navigatePreference = () => {
    navigation.navigate('PrefInput1');
  };

  const navProps = {
    navigation: navigation,
    type: 'profile',
    backNav: false
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader navProps={navProps} />
      <Text style={styles.landingTitle}>
        Time to set your partner preferences!
      </Text>
      <Layout style={styles.imgContainer}>
        <LandingImage
          imgSrc={require('../../assets/images/pref-landing-img.png')}
        />
      </Layout>
      <Layout style={styles.btnContainer}>
        <Button onPress={navigatePreference} style={styles.btn}>
          Let's Go!
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  landingTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 20,
    color: '#407BFF'
  },
  imgContainer: {
    flex: 2
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: '50%'
  }
});

export default PreferencesLandingScreen;
