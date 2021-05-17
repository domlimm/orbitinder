import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { ProfileHeader, LandingImage } from '../components/navigation/index';

const ProfileLandingScreen = ({ navigation }) => {
  const navigateLoginLanding = () => {
    // navigation.navigate('LoginLanding');
    console.log('btn works');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <Text style={styles.landingTitle}>Its time to create your profile!</Text>
      <Layout style={styles.imgContainer}>
        <LandingImage
          imgSrc={require('../assets/images/profile-interface.png')}
        />
      </Layout>
      <Layout style={styles.btnContainer}>
        <Button onPress={navigateLoginLanding} style={styles.btn}>
          Let's Go!
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
    backgroundColor: '#407BFF',
    width: '50%'
  }
});

export default ProfileLandingScreen;
