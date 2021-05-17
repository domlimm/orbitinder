import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import LandingHeader from '../components/LandingHeader';

export const LoginLanding = ({ navigation }) => {
  const navigateDetails = () => {
    console.log('btn pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <LandingHeader />
      <Layout style={{ height: '50%' }}>
        <Image
          style={styles.landingImage}
          source={require('../assets/images/high-five-pana.png')}
        />
      </Layout>
      <Layout style={{ height: '50%', alignItems: 'center' }}>
        <Button
          onPress={navigateDetails}
          style={{ width: '80%', marginBottom: 20 }}
        >
          Sign Up
        </Button>
        <Button
          onPress={navigateDetails}
          style={{ width: '80%' }}
          status='basic'
        >
          Log In
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    paddingTop: 20
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
  }
});
