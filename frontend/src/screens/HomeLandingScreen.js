import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { LandingHeader, LandingImage } from '../components/navigation/index';

const HomeLandingScreen = ({ navigation }) => {
  const navigateLoginLanding = () => {
    navigation.navigate('AuthNavigator');
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <LandingHeader />
      <Layout style={styles.flexContainer}>
        <LandingImage imgSrc={require('../assets/images/high-five-pana.png')} />
      </Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.landingTitle}>Swipe. Chat. Team Up</Text>
        <Text style={styles.textContent}>
          {'Finding your Orbital teammate\nhas never been easier.'}
        </Text>
        <Layout style={styles.btnContainer}>
          <Button onPress={navigateLoginLanding} style={styles.btn}>
            Get Started
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  flexContainer: {
    flex: 1
  },
  landingTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10
  },
  textContent: {
    textAlign: 'center',
    fontSize: 17
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

export default HomeLandingScreen;
